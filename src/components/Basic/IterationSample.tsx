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
