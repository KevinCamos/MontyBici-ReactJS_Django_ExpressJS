import "./App.css";
import * as React from "react";
import theme from "./themeConfig";

import MyRouter from "./router";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack';

function App() {
  document.title = "MontyBici";

  return (
    <div className="App">
      <div className="App-header">
        <ThemeProvider theme={theme}> 
        {/* SnackBarProvider sirve para limitar el máximo de mensajes al estilo de Toaster */}
          <SnackbarProvider maxSnack={3}>
          <MyRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
