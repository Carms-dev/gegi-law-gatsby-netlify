import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --aqua: #51C2BA;
    --aqua-light: #C4E8E2;
    --aqua-dark: #32808D; 
    --peach: #F7A58D;
    --yellow: #FCCC49;
    --gray-light: #F6F4F5;
    --black: #2E2E2E;
    --darker: #474335;
    --white: #fff;
    --off-white: #FFFBF3;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    color: var(--darker);
    line-height: 1.15;
  }
  a, button {
    font-weight: 500;
    color: var(--darker);
  }
  a {
    text-decoration: none;
  }
  button:focus, button:hover {
    outline: none;
  }
  .wrapper {
    margin: 2rem 0;
  }
  // Font sizes
  html {
    font-size: 16px;
    background: var(--off-white);
  }
  h1 {
    font-size: 2.25rem;
  }
  h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
    white-space: pre-wrap;
    line-height: 1.6;
  }
  .btn {
    text-align: center;
    background: var(--aqua);
    color: #fff;
    padding: 10px 30px;
    border-radius: 4px;
    width: 100%;
  }
  .btn-primary {
    background: var(--primary-alt);
  }
  .btn-secondary {
    background: var(--secondary);
  }
  @media (min-width: 640px) {
    .wrapper {
      margin: 4rem 0;
    }
    html {
      font-size: 16px;
    }
  }

  @media (min-width: 1024px) {
    html {
      font-size: 18px;
    }
    h1 {
      font-size: 2.5rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
`

export default GlobalStyles
