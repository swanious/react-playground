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

function RefSample() {
  const boxRef = React.useRef<any>();
  console.log(boxRef.current);

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

export default RefSample;
