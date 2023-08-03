import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    /* 1rem == 10px */
    html{
        font-size:62.5%;
    }
    body{
        font-size:1.4rem;
        font-family: 'Pretendard';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow: hidden;
    }
    html,body,#__next{
        height:100%;
    }
    h2, p, ul {
    margin: 0;
    padding: 0;
  }
`;
const Theme = { GlobalStyle };

export default Theme;
