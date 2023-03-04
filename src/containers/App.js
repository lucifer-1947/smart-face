import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import './App.css';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import ParticlesBg from 'particles-bg';

function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
      <ParticlesBg type="cobweb" color='#ff0000' num={50} bg = {true} />
    </>

  );
}

export default App;
