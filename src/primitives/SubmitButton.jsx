/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const SubmitButton = styled.button`
  display: inline-block;
  font-size: 1.2rem;
  font-weight: bold;
  background: none;
  border: 0;
  width: 9%;
  color: ${props => props.theme.iconColor};

  &:focus {
    outline: 0;
  }
  &:hover {
    color: #333;
  }
`;

export default SubmitButton;
