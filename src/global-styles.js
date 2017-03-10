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
      font-weight: 200;
    }
    .userInputForm {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
`;
