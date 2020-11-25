import React from 'react';
import { NotFoundContainer, NotFoundText, NotFoundTitle } from './notFoundStyles';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Screen not found</NotFoundText>
    </NotFoundContainer>
  );
};

export default NotFound;
