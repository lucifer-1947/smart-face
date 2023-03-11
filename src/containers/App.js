import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import './App.css';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Sigin from '../components/Sigin/Sigin';
import Register from '../components/Register/Register';

const initialState = {
  input: "",
  imageurl: "",
  boxes: [],
  route: 'sigin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ""
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;

  }

  loadUser = (userData) => {
    this.setState({ user: userData })
  }

  updateUser = () => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": this.state.user.id
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/image", requestOptions)
      .then(response => response.json())
      .then(entries => {
        this.setState(Object.assign(this.state.user, { entries: entries }))
      })
      .catch(error => console.log('error', error));
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onDetect = () => {

    this.setState({ imageurl: this.state.input })

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "id": this.state.user.id,
      'input': this.state.input
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/imageurl", requestOptions)
      .then(response => response.json())
      .then(result => {
        
        const boxes = []

        result.outputs[0].data.regions.forEach(element => {
          boxes.push(this.calculateFaceLocation(element));
        });

        this.setState({boxes:boxes})

        this.updateUser();

      })
      .catch(error => {
        this.setState({boxes:[]})
        console.log('error', error)
      })
  }

  calculateFaceLocation = (data) => {

    const regions = data.region_info.bounding_box;
    const imageElement = document.getElementById("input-image")
    const width = imageElement.width;
    const height = imageElement.height;

    return {
      id: data.region_info.id,
      leftCol: width * regions.left_col,
      topRow: height * regions.top_row,
      rightCol: width - width * regions.right_col,
      bottomRow: height - height * regions.bottom_row
    }
  }


  onRouteChange = (route) => {
    if (route === 'home') this.setState({ isSignedIn: true })
    else this.setState(initialState)

    this.setState({ route: route })
  }

  render() {
    return (
      <>
        <div className="App">
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />

          {
            (this.state.route === 'home') ?
              <>
                <Logo />
                <Rank name={this.state.user.name} rank={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onDetect={this.onDetect} />
                <FaceRecognition imageurl={this.state.imageurl} boundaries={this.state.boxes} />
              </> :
              (this.state.route === 'sigin') ?

                <Sigin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

          }


        </div>
        <ParticlesBg type="cobweb" color='#ff0000' num={50} bg={true} />
      </>
    )
  }

}

export default App;
