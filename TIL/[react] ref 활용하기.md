# [react] ref 활용하기

### what is ref ?

- HTML에 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법

### id 사용하지 않고 ref를 사용하는 이유는 뭐에요?

- react컴포넌트 안에서도 물론 id를 사용할 수 있다. 하지만 컴포넌트를 재사용하게된다면 어떨까 ?

  컴포넌트 안 DOM에 id값을 지정한 후 그 컴포넌트를 여러번 재사용하게 됐을 경우라면 어떨까 ?

  **유일해야 하는 id** 는 더이상 유일하지 않고, 문제가 생길 수 있다. 그래서 id값 대신 ref를 사용하는 것을 추천한다. 

- 다른 라이브러리나 프레임워크와 함께 id를 사용해야하는 경우에는 id 뒷부분에 01, 02, 03 ... 와 같은 추가 텍스트를 붙여서 중복 id가 발생하는 것을 방지해야한다.

### 언제 ref를 사용해야 할까요 ?

크게 보자면 DOM을 직접적으로 건드려야 할 때라고 볼 수 있다. 풀어 설명하자면

1. 스크롤 이벤트
2. 특정 input에 포커스 주기
3. canvas 요소에 그림 그리기 등



### useRef() 사용법

> 개발환경
>
> - react - v17.0.2
> - typescript - v4.3.2

실습은 styled-components를 활용하여 진행했다. 

- typescript 환경에서 styled-components를 추가하기

```bash
$ yarn add styled-components @types/styled-components
```

- Box 생성

```react
import React from 'react';
import styled from 'styled-components';

const OuterBox = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 300px;
  overflow: auto;
  position: relative;
`;

function ScrollBox() {
  const boxRef = React.useRef<any>();
  console.log(boxRef.current.scrollHeight, boxRef.current.clientHeight);

  return (
    <>
      <h1>ref 연습2</h1>
      <OuterBox ref={boxRef} />
    </>
  );
}

export default ScrollBox;
```



```react
import React from 'react';
import styled from 'styled-components';

const OuterBox = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 300px;
  overflow: auto;
  position: relative;
`;
const InnerBox = styled.div`
  width: 100%;
  height: 650px;
  background: 'linear-gradient(white, black)';
`;

function ScrollBox() {
  const boxRef = React.useRef<any>();
  console.log(boxRef.current.scrollHeight, boxRef.current.clientHeight);

  const scrollToBottom = () => {
    // scrollHeight(box 전체 높이), clientHeight(보이는 box의 높이), scrollTop(맨 위의 높이)
    const { scrollHeight, clientHeight } = boxRef.current;

    // 맨 위의 높이 = (box 전체 높이) - (보이는 box높이)
    boxRef.current.scrollTop = scrollHeight - clientHeight;
  };
  return (
    <>
      <h1>ref 연습2</h1>
      <OuterBox ref={boxRef}>
        <InnerBox />
      </OuterBox>
      <button type="button" onClick={scrollToBottom}>
        맨 밑으로
      </button>
    </>
  );
}

export default ScrollBox;

```

