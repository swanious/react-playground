import React from 'react';
import styled from 'styled-components';
import { useTodoState } from 'context/Todo/TodoContext';

const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }

  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

const day: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

function TodoHead() {
  // ContextAPI 불러오기
  const todos = useTodoState(); // 결과 initialTodo 가 잘 나온다.
  const undoneTodo = todos.filter((todo) => !todo.done);

  // 날짜 파싱하기
  const today: Date = new Date();
  const dateString: string = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName: string = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">남은 할 일 : {undoneTodo.length}개</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
