import { createTheme } from "@mui/material/styles";
const green = "#43A047";
const purple = "#BE93D4";
const white = "#F6F7FF";

const theme = createTheme({
  palette: {
    background: {
    },
    primary: {
      main: green
    },
    secondary: {
      main: green
    },
    action:{
      main: purple 
    }

  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: green,
          color:white
        },
      },
    }
  }
});

export default theme;