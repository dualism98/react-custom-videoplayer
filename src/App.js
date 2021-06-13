import Player from './lib/components/Player/Player'
import './App.css';

function App() {
  return (
    <div className="App">
      <Player 
        width={'800'}
        height={'500'}
        url={'https://archive.org/download/Bra_Bashing_/B_BASH.M4V'}/>
    </div>
  );
}

export default App;
