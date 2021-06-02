import React from 'react';
import styled from 'styled-components';
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
  return (
    <TodoListBlock>
      <TodoItem text="프로젝트 생성하기" done />
      <TodoItem text="컴포넌트 스타일링 하기" done />
      <TodoItem text="Context 만들기" done={false} />
      <TodoItem text="기능 구현하기" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
