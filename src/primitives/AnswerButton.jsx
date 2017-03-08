/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerButton = styled.span`
  display: inline-block;
  font-weight: 200;
  color: ${props => props.theme.ansColor};
  font-size: .8rem;
  font-family: ${props => props.theme.font};
  transition: background 100ms;
  cursor: pointer;
  margin: .5rem;

  &:focus,
  &:hover {
    outline: 0;
    color: ${props => props.theme.ansHoverColor};
  }
`;

export default AnswerButton;
