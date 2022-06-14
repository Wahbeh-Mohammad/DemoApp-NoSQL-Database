import { createTheme } from "@mui/material";

const themeOptions = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#020c3f',
    },
    secondary: {
      main: '#ffba00',
      contrastText: '#000'
    },
  },
  typography: {
    fontFamily: 'Droid Serif',
  },
});

export default themeOptions;