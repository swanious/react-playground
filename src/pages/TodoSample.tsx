import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TodoTemplate, TodoHead, TodoList, TodoCreate } from 'components/Todo';
import { TodoProvider } from 'context/Todo/TodoContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function TodoSample() {
  return (
    <>
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    </>
  );
}

export default TodoSample;
