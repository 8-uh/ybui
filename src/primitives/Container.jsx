/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: ${props => props.theme.width};
  height: ${props => props.theme.height};
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
`;

export default Container;
