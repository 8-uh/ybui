/**
* Globael styles
*/

/* eslint-disable */

import { injectGlobal } from 'styled-components';

injectGlobal`
    *, *:before, *:after {
      box-sizing: border-box;
    }

    body {
      margin: 0;
    }
    .iconset {
      display: flex;

      span {
        flex: 1;
  width: 0;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
      }

    }
`;
