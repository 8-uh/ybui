/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerButton = styled.li`
  font-weight: 600;
  color: ${props => props.theme.ansColor};
  font-size: 1rem;
  font-family: ${props => props.theme.font};
  transition: background 100ms;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: 0;
    color: ${props => props.theme.ansHoverColor};
  }
`;

export default AnswerButton;
