
import { createGlobalStyle } from 'styled-components';
import colors from './colors.json'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        color: ${colors.textColour};
        background: ${colors.background};
        font-style: normal;
        font-weight: normal;
    }
    

    body, input, button, textarea {
        font: 400 14px Nunito, sans-serif
    }
    #root > div > div > .container-page-content {
        min-height: calc(100vh - 95px);
        background: #FFFFFF;
    }
    `;

export default GlobalStyle;
