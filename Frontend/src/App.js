import './App.css';
import MyRouter from "./router";

function App() {
  document.title = "MontyBici"
  return (
    <div className="App">
      <header className="App-header">
      <MyRouter/>
      </header>
    </div>
  );
}

export default App;
