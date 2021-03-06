import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --aqua: #51C2BA;
    --aqua-light: #C4E8E2;
    --aqua-xlight: #EDF8F6;
    --aqua-dark: #32808D;
    --aqua-xdark: #2B6C76;
    --peach: #F7A58D;
    --peach-light: #FCDFD6;
    --yellow: #FCCC49;
    --yellow-light: #FEF5DB;
    --grey-light: #ccc;
    --grey: #747474;
    --black: #2E2E2E;
    --darker: #474335;
    --lighter: #eee;
    --white: #fff;
    --off-white: #FFFBF3;
    --border: 1px solid var(--lighter);
    --br: 12px;
    --trans-time: 0.5s;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: var(--black);
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 700;
    color: var(--darker);
    line-height: 1.2;
  }
  a, button {
    font-weight: 500;
    color: var(--darker);
    transition: all var(--trans-time) ease;
  }

  a {
    text-decoration: none;
    color: var(--aqua-dark);

    &:hover {
      color: var(--aqua-xdark);
    }
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
    scroll-behavior: smooth;
  }
  main {
    min-height: calc(100vh - 295px);
  }
  h1 {
    font-size: 2rem;
  }
  h1, h2 {
    font-size: 1.75rem;
  }
  h3 {
    font-size: 1.25rem;
    line-height: 1.3;
  }
  li, p {
    font-size: 1rem;
    white-space: pre-wrap;
    line-height: 1.6;
  }
  .card {
    border-radius: var(--br);
    border: var(--border);
  }
  .btn {
    text-align: center;
    background: var(--aqua-dark);
    color: #fff;
    padding: 18px 36px;
    border-radius: var(--br);
    border: var(--border);
    width: 100%;
    font-size: 1.25rem;
    opacity: 1;

    &:hover {
      color: var(--white);
      opacity: 0.9;
    }
  }

  // Section
  .pb-section {
    padding-bottom: 3rem;
  }
  .py-section {
    padding: 3rem 0;
  }
  .bg-aqua {
    background: var(--aqua-light);
  }

  /* nprogress bar */
  #nprogress .bar {
    height: 5px !important;
  }
  /* curve hero section bottom */
  #curve {
    background-color: var(--grey-light);
    height: 8vmax;
    width: 100vw;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 50%;
  }

  #curve:after {
    content:"";
    display: block;
    background-color: var(--aqua-light);
    height: 6vmax;
    width: 100vw;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  /* wave hero section bottom */
  #wave-container {
    width: 100%;
    height: 100px;
    overflow: hidden;
  }

  #wave {
    display: block;
    position: relative;
    height: 40px;
    background: var(--aqua-light);
  }

  #wave:before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 100%;
    width: 100%;
    height: 300px;
    background-color: var(--off-white);
    right: -25%;
    top: 20px
  }

  #wave:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 100%;
    width: 100%;
    height: 300px;
    background-color: var(--aqua-light);
    left: -25%;
    top: -240px;
  }

  @media (min-width: 640px) {
    html {
      font-size: 16px;
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
