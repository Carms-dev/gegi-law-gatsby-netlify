import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
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

export default theme
