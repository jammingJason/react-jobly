import React, { useState } from 'react';
let token = null;
const setTok = (newToken) => {
  console.log('THIS IS THE TOKEN FROM SET TOK ===> ' + newToken);
  token = newToken;
};

const getTok = () => {
  if (!token) {
    return 'There is no token';
  }
  return token;
};

export { setTok, getTok };
