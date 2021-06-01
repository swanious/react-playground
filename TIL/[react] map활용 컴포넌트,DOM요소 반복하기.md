# [react] map활용 컴포넌트,DOM요소 반복하기

### 개발환경

> react - v17.0.2
>
> typescript - v4.3.2



## map활용 컴포넌트 반복하기

### 예제

- IterationSample.tsx

```react
import React from 'react';

// map활용 컴포넌트 반복하기
function IterationSample() {
  const names: string[] = ['짜장면', '짬뽕', '탕수육'];

  // map함수로 배열을 새로 생성한 후 return으로 컴포넌트를 반환할 수 있습니다.
  const nameList: JSX.Element[] = names.map((name) => <li>{name}</li>);
  return <ul>{nameList}</ul>;
}

export default IterationSample;
```

![image-20210529172246498](%5Breact%5D%20map%ED%99%9C%EC%9A%A9%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8,DOM%EC%9A%94%EC%86%8C%20%EB%B0%98%EB%B3%B5%ED%95%98%EA%B8%B0.assets/image-20210529172246498.png)

map함수를 활용하여 컴포넌트 배열을 반환할 수 있습니다. 

하지만 위의 코드를 렌더링하고 `f12`를 눌러 개발자도구의 console을 보면 다음과 같은 에러가 발생합니다.

![image-20210529172659712](%5Breact%5D%20map%ED%99%9C%EC%9A%A9%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8,DOM%EC%9A%94%EC%86%8C%20%EB%B0%98%EB%B3%B5%ED%95%98%EA%B8%B0.assets/image-20210529172659712.png)

`map함수를 활용하여 컴포넌트나 DOM을 반복적으로 렌더링할 때, unique한 key가 필요합니다.`

즉, 각 요소에 고유의 key값을 넣어줘야한다. 근데 왜 key값을 넘겨줘야할까?

-> 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다. 예로 데이터를 생성, 수정, 삭제할 때 빠르게 원소의 변화를 빠르게 감지할 수 있다고 한다.



## 컴포넌트에 key값 넣어주기

- 고유한 id가 있을 때,

```react
articles.map((article) => <li key={article.id}>{article.title}</li>)
```

예로, 페이스북과 같이 피드(게시물) 배열 데이터를 받아서 렌더링할때, 각 게시물마다 고유한 id값이 존재하므로, 위와 같이 고유한 id값을 각 요소에 key값으로 넘겨주면 해결된다.



- 실습과 같이 고유한 id가 없을 때,

```react
data.map((value, index)=> <li key={index}>{value}</li>)
```

하지만 실습처럼 넘겨줄 고유한 id값이 없을 때, map의 callback함수의 인수인 index를 활용하여 key값을 넘겨줄 수 있다. 하지만 index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다고 한다. (고유한 값이 없을때만 index를 사용해야한다.)



## 응용

key에 map의 index를 넣어주는 것이 리렌더링에서 비효율이라고 한다. 이를 위해 데이터를 추가할 때 고유한 id값을 넣어주려면 어떻게 해야할까? 다음과 같이 코드를 수정해보자.

### 초기 상태 추가하기

1. menus 객체 배열에 `id` 추가
2. 객체가 생성될 때 넣어줄 `uniqueId`, 데이터를 추가하기 위한 `inputText` 생성
3. `li` 태그에 `menu.id` 넣어주기 

```react
function IterationSample() {
    
  // 1.
  const [menus, setMenus] = React.useState<Menus[]>([
    { id: 1, name: '짜장면' },
    { id: 2, name: '짬뽕' },
    { id: 3, name: '탕수육' },
  ]);
    
  // 2.
  const [uniqueId, setUniqieId] = React.useState<number>(4);
    
  // 3.
  const [inputText, setInputText] = React.useState<string>('');
    
  // 4.
  const nameList: JSX.Element[] = menus.map((menu) => <li key={menu.id}>{menu.name}</li>);

  return (
    <>
      <h1>map으로 컴포넌트 반복하기</h1>
      <input type="text" onChange={handleChange} />
      <button type="button" onKeyPress={handlePress} onClick={handleClick}>
        추가
      </button>
      <ul>{nameList}</ul>
    </>
  );
    
}
```

### 데이터 추가 기능

위 코드에서 함수만 아래의 함수만 추가한다.

```react
// ...

// text 값을 저장
const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      setInputText(e.target.value);
  };

// 추가 버튼 클릭 시 `li`에 추가
const handleClick = (): void => {
    setMenus(
        menus.concat({
            id: uniqueId,
            name: inputText,
        }),
    );
    setUniqieId(uniqueId + 1);
    setInputText('');
};

// input에 데이터 작성 후 Enter 누르면 `li`에 추가
const handlePress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
        handleClick();
    }
};

//...
```

- 클릭/enter 이벤트 전

![image-20210529181541696](%5Breact%5D%20map%ED%99%9C%EC%9A%A9%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8,DOM%EC%9A%94%EC%86%8C%20%EB%B0%98%EB%B3%B5%ED%95%98%EA%B8%B0.assets/image-20210529181541696.png)

- 아래처럼 잘 반영되고, `F12`의 콘솔에 더이상 오류가 나타나지 않는다.

![image-20210529181555244](%5Breact%5D%20map%ED%99%9C%EC%9A%A9%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8,DOM%EC%9A%94%EC%86%8C%20%EB%B0%98%EB%B3%B5%ED%95%98%EA%B8%B0.assets/image-20210529181555244.png)

## 전체 코드

```react
import React, { ChangeEvent } from 'react';

interface Menus {
  id: number;
  name: string;
}

// map활용 컴포넌트 반복하기
function IterationSample() {
  const [menus, setMenus] = React.useState<Menus[]>([
    { id: 1, name: '짜장면' },
    { id: 2, name: '짬뽕' },
    { id: 3, name: '탕수육' },
  ]);
  const [uniqueId, setUniqieId] = React.useState<number>(4);
  const [inputText, setInputText] = React.useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const handleClick = (): void => {
    setMenus(
      menus.concat({
        id: uniqueId,
        name: inputText,
      }),
    );
    setUniqieId(uniqueId + 1);
    setInputText('');
  };
  const handlePress = (e: any) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  const nameList: JSX.Element[] = menus.map((menu) => <li key={menu.id}>{menu.name}</li>);
  return (
    <>
      <h1>map으로 컴포넌트 반복하기</h1>
      <input
        type="text"
        value={inputText}
        onKeyPress={(e) => handlePress(e)}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        추가
      </button>
      <ul>{nameList}</ul>
    </>
  );
}

export default IterationSample;
```



### 요약

- 반복되는 데이터를 렌더링할 때 `map` 함수를 활용할 수 있다.
- 컴포넌트 배열을 렌더링할 때 `key` 값 설정에 주의해야한다. (유일한 값 !)
- 상태(state)안에서 배열을 변형할 때 배열에 직접 접근하지 않고, `concat`, `filter` 로 새로운 배열을 할당하여 새로운 상태로 설정해야한다.