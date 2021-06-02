import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TodoTemplate, TodoHead } from 'components/Todo';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function TodoSample() {
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
      </TodoTemplate>
    </>
  );
}

export default TodoSample;
