import Player from './lib/components/Player/Player'
import './App.css';

function App() {
  return (
    <div className="App">
      <Player 
        width={'800'}
        height={'500'}
        panelColor={'#006AB3'}
        url={'https://archive.org/download/rammsteinstripped/Rammstein%20-%20Stripped.mp4'}/>
    </div>
  );
}

export default App;
