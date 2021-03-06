import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';

const NavBar = props => {
  const { token, logout } = useContext(AuthContext);

  return(
    <Wrapper className="wrapper">
      <Nav>
        <NavItem><NavLink to='/'>Home</NavLink></NavItem>
        { token && <NavItem><NavLink to='/createpost'>Create a post</NavLink></NavItem> }
        { !token&& <NavItem><NavLink to='/signup'>Sign up</NavLink></NavItem> }
        { !token && <NavItem><NavLink to='/login'>Log in</NavLink></NavItem> }
        { token && <NavItem onClick={logout}><div>Log out</div></NavItem> }
      </Nav>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  padding: 1rem 0;
  font-size: 2rem;
  color: white;
  background-color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Nav = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const NavItem = styled.li`
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1.5rem;
`