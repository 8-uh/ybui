/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerIcon = styled.i`
  display: inline-block;
  color: ${props => props.theme.ansColor};
  transition: background 100ms;
  cursor: pointer;
  margin: .5rem;

  &:focus,
  &:hover {
    outline: 0;
    color: ${props => props.theme.ansHoverColor};
  }
`;

export default AnswerIcon;
