/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerButton = styled.li`
  color: ${props => props.theme.ansColor};
  font-size: 1rem;
  font-family: ${props => props.theme.font};
  transition: background 100ms;
  cursor: pointer;
  list-style: none;
  margin-bottom: 4px;

  &:focus,
  &:hover {
    outline: 0;
    color: ${props => props.theme.ansHoverColor};
  }
`;

export default AnswerButton;
