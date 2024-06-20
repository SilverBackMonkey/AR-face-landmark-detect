import ImageLoad from '../components/ImageLoad';
import ColorPicker from '../components/ColorPicker';
import VideoInput from '../components/VideoInput';

function Home() {
  return (
    <div className="App container mx-auto py-8" style={{minHeight: window.innerHeight}}>
      <ImageLoad />
      {/* <VideoInput /> */}

      <ColorPicker />
    </div>
  );
}

export default Home;
