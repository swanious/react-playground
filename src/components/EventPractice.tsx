import React from 'react';

interface User {
  username: string;
  message: string;
}

function EventPractice() {
  const [form, setForm] = React.useState({
    username: '',
    message: '',
  });

  const { username, message } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const nextForm: User = {
      ...form, // 기존의 form 내용을 이 자리에 복사한 뒤
      [e.target.name]: e.target.value, // 원하는 값을 덮어 씌우기
    };
    setForm(nextForm);
  };

  const onClick = () => {
    alert(`${username}: ${message}`);
    setForm({
      username: '',
      message: '',
    });
  };

  const onkeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClick();
    }
  };
  return (
    <div>
      <h1>이벤트 연습</h1>
      <input
        type="text"
        name="username"
        placeholder="유저 이름을 입력해주세요."
        value={username}
        onChange={(e) => onChange(e)}
      />
      <input
        type="text"
        name="message"
        placeholder="아무거나 입력해보세요."
        value={message}
        onChange={(e) => onChange(e)}
        onKeyPress={(e) => onkeypress(e)}
      />
      <button style={{ marginBottom: 10 }} type="button" onClick={onClick}>
        확인
      </button>
    </div>
  );
}

export default EventPractice;
