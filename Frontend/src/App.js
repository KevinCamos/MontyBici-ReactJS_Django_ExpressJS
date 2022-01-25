import './App.css';
import MyRouter from "./router";

function App() {
  document.title = "MontyBici"

  return (
    <div className="App">
      <div className="App-header">
       <MyRouter/>
      </div>
    </div>
  );
}

export default App;
