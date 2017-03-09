/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const AnswerIcon = styled.span`
  display: inline-block;
  color: ${props => props.theme.iconColor};
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
