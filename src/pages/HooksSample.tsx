import React, { useState } from 'react';
import { Counter, Info, ReducerSample } from 'components/Hooks';

function HooksSample() {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Counter />
      <hr />

      {visible && <Info />}
      <button
        type="button"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? '숨기기' : '보이기'}
      </button>
      <hr />

      <ReducerSample />
    </>
  );
}

export default HooksSample;
