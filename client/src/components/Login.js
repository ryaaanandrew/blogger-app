import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { LOGIN } from '../queries/queries';
import { AuthContext } from '../context/authContext';

const Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login }= useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault();
    if(email.length >= 3 && password.length >=3) {
      login(email, password);
      props.history.push('/');
    }
  };

  return(
    <Wrapper>
      <Header>Log in</Header>
      <Form onSubmit={e => handleSubmit(e)}>
        <Label htmlFor="email">email</Label>
        <Input type="email" value={email} onChange={e => setEmail(e.target.value)}/>

        <Label htmlFor="password">password</Label>
        <Input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

        <button type='submit'>login</button>
      </Form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 80%;
  margin: 3rem auto;
  border: 1px solid black;
  text-align: center;
`

const Form = styled.form`
  padding: 2rem 3rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const Header = styled.h1`
  color: white;
  background-color: black;
  width: 100%;
  font-weight: normal;
  padding: 2rem 2.5rem;
`

const Label = styled.label`
  font-size: 2rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: 30%;
  height: 2.5rem;
  margin-bottom: 1rem;
`

const Button = styled.button`
  padding: 1rem 1.5rem;
`

const Error = styled.div`
  background-color: red;
  color: white;
  font-size: 2rem;
  padding: 1rem 1.5rem;

`
