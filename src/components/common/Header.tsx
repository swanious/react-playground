import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  height: 64px;
  background: lightblue;
  display: flex;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  & > .selected {
    background: lightcoral;
  }
  & > a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: black;
    font-size: 24px;
    font-weight: 700;
  }
`;

const tags = [
  { id: 1, path: '/', title: 'Basic' },
  { id: 2, path: '/hooks', title: 'Hooks' },
  { id: 3, path: '/todos', title: 'Todo' },
];

function Header() {
  return (
    <Wrapper>
      {tags.map((tag) => (
        // draggable={false}를 통해 링크를 누를 때 불필요한 drag이벤트를 막기
        <NavLink key={tag.id} to={tag.path} draggable={false} activeClassName="selected" exact>
          {tag.title}
        </NavLink>
      ))}
    </Wrapper>
  );
}

export default Header;
