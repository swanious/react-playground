import React from 'react';
import styled from 'styled-components';

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
  return (
    <TodoHeadBlock>
      <h1>{`${new Date().getFullYear()}년 ${
        new Date().getMonth() * 1 + 1
      }월 ${new Date().getDate()}일`}</h1>
      <div className="day">{day[new Date().getDay()]}</div>
      <div className="tasks-left">남은 할 일 :</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
