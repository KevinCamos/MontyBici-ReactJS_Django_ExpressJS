import './App.css';
import * as React from 'react';
import theme from "./themeConfig";

import MyRouter from "./router";
import { ThemeProvider } from '@mui/material/styles';

function App() {
  document.title = "MontyBici"


  return (
    <div className="App">
      <div className="App-header">
      <ThemeProvider theme={theme}>

       <MyRouter/>
       </ThemeProvider>

      </div>
    </div>
  );
}

export default App;
