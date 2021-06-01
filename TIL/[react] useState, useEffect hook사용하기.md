> 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 함수형 컴포넌트의 hook이다.
>
> class컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태

아래는 useEffect가 어떻게 동작되는지 보기위한 예시 코드이다. 순서는 다음과 같다.

1. MyComp에서 input의 changeEvent를 통해 상태가 변할 때(update) 동작을 본다.
2. App에서 MyComp를 그려준다.
3. App에서 언마운트될 때의 동작을 보기위해 visible 상태가 변할 때 return 문 내의 `cleanup` 함수의 동작을 본다.

### MyComp.tsx

```typescript
...
function MyComp() {
  const [name, setName] = useState<string>('');

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <div>
        <input type="text" value={name} onChange={onChangeName} />
      </div>
      <div>
          <p>이름 : {name}</p>
      </div>
    </>
  );
}

export default MyComp;
```

### App.tsx

```typescript
function App() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {visible && <MyComp />}
      <button
        type="button"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
    </>
  );
}

export default App;

```
### 1. 의존성 배열이 빈배열일 때
- MyComp의 return문 위에 아래 코드 추가
```typescript
// ...
useEffect(() => {
    console.log('마운트될 때만 실행됨')
    
    return () => {
        console.log('언마운트될 때만 실행됨')
    }
}, [])
```
- 콘솔창(F12)를 열어보면 컴포넌트가 마운트될 때 한번 console이 찍히는 것 확인

![의존성 배열에 따라 다른 useEffect 동작 알아보기](https://images.velog.io/images/swanious/post/cff0a0c0-3f2c-49dd-b311-276fc247657b/image.png)


![의존성 배열에 따라 다른 useEffect 동작 알아보기](https://images.velog.io/images/swanious/post/53bfb823-1236-4699-a538-773b58ae5ec1/image.png)


- `숨기기` 버튼을 눌러서 컴포넌트를 언마운트 시켜보면, 아래처럼 언마운트 되기 전 return문 내부의cleanup함수를 실행한다. 이는 배열에 상태값을 넣어도 동일하게 작동한다.

![의존성 배열에 따라 다른 useEffect 동작 알아보기](https://images.velog.io/images/swanious/post/e3f00cf1-e00f-4b37-a1e3-d0f62180abb8/image.png)

![의존성 배열에 따라 다른 useEffect 동작 알아보기](https://images.velog.io/images/swanious/post/3cb0a70b-770d-400c-8906-83bbcc3953ff/image.png)


위처럼 의존성 배열이 비어있을 때는 처음 컴포넌트가 새롭게 생성되는 시점에 **한 번** 실행된다. 그래서 아래의 코드처럼 **백엔드 서버에 데이터를 요청할 때** fetch(or axios) 작업을 한다.

```typescript
useEffect(() => {
    fetchUser() // <- 마운트될 때 데이터 받아오기
}, [])
```

 

### 2. 의존성 배열에 상태값이 있을때

- MyComp의 return문 위에 아래 코드 추가

```typescript
// ...
useEffect(() => {
    console.log('상태값이 업데이트될 때 실행됨')
    console.log(상태 값)
    return () => {
        console.log('상태가 업데이트 되기 전 / 언마운트 되기 전 실행됨')
    	console.log(상태 값)
    }
}, [상태 값]) // <- 의존성 배열에 상태값 존재
```

- '오솬'을 친 후 결과

![](https://images.velog.io/images/swanious/post/4b6441fa-c5d4-4766-aa32-bd51a613b2ca/image.png)

![](https://images.velog.io/images/swanious/post/ba031ccb-9dab-4978-9f51-1a42c2832893/image.png)

위의 코드를 정리하자면, 다음과 같은 순서로 useEffect가 동작한다.

1. 업데이트가 되기 전에 return문 내에 cleanup함수 실행 (업데이트 전)
2. 업데이트 되기 전의 상태 값('오솨') 출력 
3. 업데이트가 된 후 return문 윗 부분 실행 (업데이트 후)
4. 업데이트가 된 후 상태 값 출력('오솬') 