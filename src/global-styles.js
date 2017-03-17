/**
* Globael styles
*/

/* eslint-disable */

import { injectGlobal } from 'styled-components';
import theme from './theme'

injectGlobal`

    *, *:before, *:after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      margin-top: 20px;
      font-weight: 200;
    }

    html {
      overflow: scroll;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }

    .draggable {
      -webkit-app-region: drag;
      overflow-x: hidden;
    }
    .userInputForm {
      width: 100%;
      position: fixed;
      bottom: 0;
      background: #FFF;
      left: 0;
      border-top: 1px solid ${theme.whiteLine};
    }
    ul.answerli {
      padding-left: 10px;
      margin: 0;
    }
    .spDivider {
      clear: both;
      display: block;
      margin: 15px 0;
      color: ${theme.whiteLine};
    }
    .imgbrowser {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      padding: 5px;
      min-height: 40vh;
      border-style: dashed;
      cursor: pointer;
      border-width: 2px;
      border-color: ${theme.whiteLine};
    }
    .activiImgbrowser {
      border-width: 3px;
      border-color: ${theme.ansColor};
    }
    .material-icons.md-18 { font-size: 18px; }
    .material-icons.md-24 { font-size: 24px; }
    .material-icons.md-36 { font-size: 36px; }
    .material-icons.md-48 { font-size: 48px; }
    .flash-message {
      font-size: 10px;
    }
    .walletList {
      padding: 10px;
      box-sizing: border-box;
      color: ${theme.txtColor};
      li {
        list-style: none;
        padding: 5px;
        font-size: 15px;
        font-family: 'Monaco', Courier;
        border-bottom: 1px dashed ${theme.whiteLine};
      }
    }
    code, pre {
      font-family: Consolas, "Lucida Console", Monaco, monospace;
      overflow: scroll;
      white-space: pre;
    }
`;
