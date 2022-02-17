import { createTheme } from '@mui/material/styles';

// Config theme settings
const theme = createTheme({
  palette: {
    background: {
      paper: '#313133'
    },
    primary: {
      main: '#43A047'
    },
    secondary: {
      main: '#FF9E79'
    },
    text: {
      primary: '#F6F7FF',
      secondary: '#6b778c'
    }
  }
});

export default theme;
