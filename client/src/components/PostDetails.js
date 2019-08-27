import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST } from '../queries/queries';
import CommentForm from './CommentForm';

const PostDetails = props => {
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id:  props.match.params.id
    }
  });
  
  if(loading){ return <h1>loading...</h1> };
  if(error){ return <h1>an error has occured...</h1> };

  return(
    <Wrapper>
    <PostDetailsContainer>
      <Title>{ data.post.title }, posted by { data.post.creator.username }</Title>
      <Content>{ data.post.content }</Content>
    </PostDetailsContainer>
    <CommentForm />
    </Wrapper>
  );
};

export default PostDetails;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const PostDetailsContainer = styled.div`
  border: 1px solid black;
  width: 60%;
  margin: 3rem auto;
  text-align: center;
`

const Title = styled.h1`
  padding: 1rem 2rem;
  color: whitesmoke;
  font-size: 3rem;
  width: 100%;
  background-color: #333;
`

const Content = styled.p`
  font-size: 2rem;
  padding: 2rem 3rem;

`