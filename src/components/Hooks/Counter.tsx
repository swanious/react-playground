import React, { useState, useReducer } from 'react';

/*
  리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아
  새로운 상태를 반환하는 함수임. 리듀서 함수에서 새로운 상태를 만들 떄는 반드시 불변성을 지켜줘야함
  배열의 경우의 예로, newList = stateList.concat(넣어줄 값) 형식으로 새로운 배열을 선언해서
  기존의 배열이 더럽혀지지 않도록해야함

  useReducer의 가장 큰 장점 -> 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것
  이게 왜 좋을까?를 생각하보자.

  react는 부모 컴포넌트가 업데이트가 될 때마다 자식 컴포넌트가 새로 렌더링하는데
  이를 막아 최적화할 수 있어서?
*/

type Action = { type: 'INCREASE' } | { type: 'DECREASE' };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => dispatch({ type: 'INCREASE' });
  const onDecrease = () => dispatch({ type: 'DECREASE' });
  return (
    <div>
      <p>현재 카운터 값은 {count}입니다.</p>
      <button type="button" onClick={onIncrease}>
        +1
      </button>
      <button type="button" onClick={onDecrease}>
        -1
      </button>
    </div>
  );
}

export default Counter;
