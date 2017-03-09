/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

const CardItem = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 1px 1px 8px 0 rgba(0,0,0,0.1);
  
  .card-outer {
    display: inline-block;
    display: flex;
    width: 33%;
    padding: 0 15px;
    margin: 0 0 30px;
    vertical-align: top;
  }
  .card {
    background-color: white;
    border-radius: 4px;
    box-shadow: 1px 1px 8px 0 rgba(0,0,0,0.1);
  }
  .card__photo {
    background-color: #B1ECD8;
    height: 120px;
  }
  .card__inner {
    padding: 15px;
  }
  .card__content {
    height: 15px;
    background-color: #B1ECD8;
    margin-bottom: 10px;
  }
  .card__content--short {
    width: 75%;
  }
`;

export default CardItem;
