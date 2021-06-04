import React, { useReducer, createContext, useContext, useRef, Dispatch, Ref } from 'react';

const initialTodos: State[] = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 생성하기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

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
const TodoNextIdContext = createContext<any>(null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>{children}</TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

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

export function useTodoNextId(): any {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find Provider');
  }
  return context;
}
