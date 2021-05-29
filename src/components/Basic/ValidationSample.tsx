import React from 'react';
import 'assets/css/ValidationSample.css';

function ValidationSample() {
  const [clicked, setClicked] = React.useState<boolean>(false);
  const [validated, setValidated] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>('');
  const inputRef = React.useRef<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    setClicked(true);
    setValidated(password === '0000');

    // ref를 이용한 DOM 이벤트
    inputRef.current.focus();
  };

  const handleValidate = () => {
    if (clicked) {
      return validated ? 'success' : 'failure';
    }
    return '';
  };

  return (
    <div>
      <h1>ref 연습</h1>
      <input
        type="password"
        ref={inputRef}
        value={password}
        onChange={handleChange}
        className={handleValidate()} // eslint에 의해 다중 삼항연산자는 에러 발생하므로 함수로 사용
      />
      <button type="button" onClick={handleClick}>
        검증하기
      </button>
    </div>
  );
}

export default ValidationSample;
