import React, { useState, useEffect } from 'react';

function Info() {
  const [name, setName] = useState<string>('');
  // const [nickname, setNickname] = useState<string>('');

  useEffect(() => {
    console.log('상태값이 업데이트 되고 실행됨');
    console.log(name);
    return () => {
      console.log('상태가 업데이트 되기 전 실행됨');
      console.log(name);
    };
  }, [name]);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  // const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNickname(e.target.value);
  // };

  return (
    <>
      <div>
        <input type="text" value={name} onChange={onChangeName} />
        {/* <input type="text" value={nickname} onChange={onChangeNickname} /> */}
      </div>
      <div>
        <div>
          <b>이름 :</b>
          {name}
        </div>
        {/* <div>
          <b>닉네임 :</b>
          {nickname}
        </div> */}
      </div>
    </>
  );
}

export default Info;
