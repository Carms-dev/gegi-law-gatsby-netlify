import { createGlobalStyle } from 'styled-components';
import RubikLight from '../assets/fonts/Rubik/Rubik-Regular.ttf'
import RubikRegular from '../assets/fonts/Rubik/Rubik-Regular.ttf'
import RubikMedium from '../assets/fonts/Rubik/Rubik-Medium.ttf'
import RubikBold from '../assets/fonts/Rubik/Rubik-Bold.ttf'

const Typography = createGlobalStyle`
  @font-face {
    font-family: 'Rubik';
    src: url(${RubikLight});
    font-weight: 300;
  }

  @font-face {
    font-family: 'Rubik';
    src: url(${RubikRegular});
    font-weight: 400;
  }

  @font-face {
    font-family: 'Rubik';
    src: url(${RubikMedium});
    font-weight: 500;
  }

  @font-face {
    font-family: 'Rubik';
    src: url(${RubikBold});
    font-weight: 700;
  }

  html {
    font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default Typography
