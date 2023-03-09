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


class App extends Component {

  constructor() {
    super();
    this.state = {
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
  }

  loadUser = (userData) => {
    this.setState({ user: userData })
    console.log(this.state.user)

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
      .then(entries =>{
        this.setState(Object.assign(this.state.user, {entries:entries}))
      })
      .catch(error => console.log('error', error));
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onDetect = () => {

    this.setState({ imageurl: this.state.input })

    console.log(this.state.input)

    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = '7e7f65687c224928bc6fbfac9006e18d';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = '2g3xwbmf4u7b';
    const APP_ID = 'my-first-application';
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';
    const IMAGE_URL = this.state.input;

    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {

        this.updateUser();

        this.state.boxes = []

        result.outputs[0].data.regions.forEach(element => {
          this.displayFaceBox(this.calculateFaceLocation(element))
        });

        if(this.state.boxes.length!=0) this.setState(this.state.boxes)

      })
      .catch(error => console.log('error', error));

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

  displayFaceBox = (box) => {
    this.state.boxes.push(box)
  }


  onRouteChange = (route) => {
    if (route === 'home') this.setState({ isSignedIn: true })
    else this.setState({ isSignedIn: false })

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
