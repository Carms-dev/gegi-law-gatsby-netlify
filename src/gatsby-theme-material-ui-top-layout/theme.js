import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'sans-serif'
    ].join(','),
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
