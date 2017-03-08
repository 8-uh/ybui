/* eslint-disable */

import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const MessageBlob = styled.div`
  padding: ${props => props.theme.bubblePadding};
  display: inline-block;
  font-weight: 200;
  font-family: ${props => props.theme.font};
  color: ${props => props.theme.txtColor};
  margin-bottom: .2rem;
  animation: ${fadeIn} 250ms;
`;

const MessageBlobBot = styled.div`
  padding: ${props => props.theme.bubblePadding};
  display: inline-block;
  font-weight: 200;
  color: ${props => props.theme.botTxtColor};
  font-family: ${props => props.theme.font};
  margin-top: .8rem;
  margin-bottom: .2rem;
  animation: ${fadeIn} 250ms;
`;


const MessageBlobUser = styled(MessageBlob)`
  color: ${props => props.theme.txtColor};
`;

export {
  MessageBlobBot,
  MessageBlobUser,
}
