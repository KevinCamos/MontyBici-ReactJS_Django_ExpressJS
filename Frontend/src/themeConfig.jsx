import { createTheme } from "@mui/material/styles";
const green = "#43A047";

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
      main: "#BE93D4" //Purple
    }

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