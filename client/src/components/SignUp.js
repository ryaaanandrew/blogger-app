import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { CREATE_USER } from '../queries/queries';

const SignUp = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleSubmit = e => {
    e.preventDefault();
    if(username.length > 6 && password.length > 6 && password === passwordConfirm) {
      createUser({ variables: { email, username, password } })
    };
    props.history.push('/');
  };

  return(
    <Wrapper>
      <Header>Sign Up</Header>  
      <Form onSubmit={(e) => handleSubmit(e)}>
        { error ? error.graphQLErrors.map(({ message }, i)=> {
          return <Error key={i}>{message}</Error>
        }) : null}
        <Label htmlFor="email">email</Label>
        <Input type="email" required name='eemail' onChange={e => setEmail(e.target.value)}/>

        <Label htmlFor="username">username</Label>
        <Input type="text" required name='username' onChange={e => setUsername(e.target.value)}/>

        <Label htmlFor="password">password</Label>
        <Input type="password" required name='password' onChange={e => setPassword(e.target.value)}/>

        <Label htmlFor="passwordConfirm">password</Label>
        <Input type="password" required name='passwordConfirm' onChange={e => setPasswordConfirm(e.target.value)}/>
        { formErrors.length > 0 ? 
          formErrors.map(error => <Error>{error}</Error>)
          : null }
        <Button>Submit</Button>
      </Form>  
    </Wrapper>
  );
};

export default SignUp;

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