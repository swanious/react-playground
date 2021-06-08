import { create } from 'domain';
import React, { useReducer, createContext, useContext, useRef, Dispatch } from 'react';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i += 1) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// lag 발생시키기 위해 초기 2500개 데이터 받아주기
const initialTodos: any[] = createBulkTodos();

// 상태를 위한 타입
type State = {
  id: number;
  text: string;
  done: boolean;
};

// 모든 액션들을 위한 타입
type Action =
  | { type: 'CREATE'; todo: State }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

// 디스패치를 위한 타입 (Dispatch를 리액트에서 불러올 수 있음)
type TodoDispatch = Dispatch<Action>;
type TodoRef = {
  current: number;
};

function todoReducer(state: State[], action: Action): State[] {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);

    case 'TOGGLE':
      return state.map((todo) => (todo.id === action.id ? { ...todo, done: !todo.done } : todo));

    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type`);
  }
}

// 빈 값을 넣으면 에러발생(인자를 1개이상 넣어줘야함)
const TodoStateContext = createContext<State[] | null>(null);
const TodoDispatchContext = createContext<TodoDispatch | null>(null);
const TodoNextIdContext = createContext<TodoRef | null>(null); // TodoRef타입을 선업하고, current 타입에 number를 지정했다.

// children은 ReactNode로 자식 컴포넌트를 가리킴
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef<number>(2501);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

/*
  이렇게 따로 관리하면 필요한 함수만 불러 사용해서 최적화할 때 좋다.
  + 에러핸들링은 덤덤덤!
*/
export function useTodoState(): State[] {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}

export function useTodoDispatch(): TodoDispatch {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}

export function useTodoNextId(): TodoRef {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}
