import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TodoTemplate, TodoHead, TodoList, TodoCreate } from 'components/Todo';

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
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </>
  );
}

export default TodoSample;
