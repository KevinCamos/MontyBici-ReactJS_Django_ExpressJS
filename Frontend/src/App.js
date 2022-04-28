import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import * as React from 'react';
import './App.css';
import MyRouter from './router';
import theme from './themeConfig';

function App() {
  document.title = 'MontyBici';

  return (
    <div className="App">
      <div className="App-header">
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <MyRouter />
          </SnackbarProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
