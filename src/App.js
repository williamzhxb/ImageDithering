import './App.css';
import ImageUpload from "./components/ImageUpload"

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Image Dithering Tool
        </p>
        <ImageUpload/>
      </header>
    </div>
  );
}

export default App;
