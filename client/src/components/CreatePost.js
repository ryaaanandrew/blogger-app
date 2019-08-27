import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_POST, getPostsQuery } from '../queries/queries';
import { AuthContext } from '../context/authContext';

const CreatePost = props => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('')
  const [createPost] = useMutation(CREATE_POST); 

  const { userId } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault()
    if(title === '' || body === '') {
      setError('Cannot leave field empty');
      return
    }
    createPost({ variables: { title: title, content: body, creatorId: userId }, refetchQueries: [{ query: getPostsQuery }] })
    setError('')
    setTitle('');
    setBody('');
    props.history.push('/');
  };

  return(
    <Wrapper>
      <FormWrapper>
        <Header>Create a new post</Header>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)}/>

          <FormLabel htmlFor="content">Content</FormLabel>
          <TextArea type="text" name='content' value={body} onChange={(e) => setBody(e.target.value)}/>
          { error ? <Error>{error}</Error> : null }
          <Button type='submit'>submit</Button>
        </Form>
      </FormWrapper>
    </Wrapper>
  );
};

export default CreatePost;

const Wrapper = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormWrapper = styled.div`
  border-radius: 10px;
  background-color: lightgrey;
  width: 60%;
  margin: 0 auto;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Form = styled.form`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Header = styled.h1`
  font-weight: normal;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`

const FormLabel = styled.label`
  font-size: 1.6rem;
  margin-bottom: 1rem;
`

const Input = styled.input`
  height: 2.5rem;
  width: 50%;
  margin-bottom: 1rem;
`
const TextArea = styled.textarea`
  height: 2rem;
  height: 15rem;
  width: 50%;
  margin-bottom: 1rem;
`

const Button = styled.button`
  font-size: 1.5rem;
  padding: .5rem 1rem;
`

const Error = styled.div`
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  width: 40%;
  color: red;
  background-color: black;
  border-radius: 10px;
`