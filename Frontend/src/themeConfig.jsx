import { createTheme } from "@mui/material/styles";
const green = "#43A047";
//Config theme settings
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

  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: green,
          color:"#F6F7FF"
        },
      },
    }
  }
});

export default theme;