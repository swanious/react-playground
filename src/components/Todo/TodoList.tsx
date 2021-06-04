import React from 'react';
import styled from 'styled-components';
import { useTodoState } from 'context/Todo/TodoContext';
import TodoItem from './TodoItem';

// 할 일을 보여주는 TodoList
const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;

  /* <overflow 정리>
    hidden: 내용 잘림. 스크롤바 X
    scroll: 내용 잘림. 스크롤바 O
    auto: 내용 잘림. 필요할때만 스크롤바 O
    visible: 내용이 안잘리고 DOM사이즈를 초과할 시 넘침) 
   */
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} done={todo.done} />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
