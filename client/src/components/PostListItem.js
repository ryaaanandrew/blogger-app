import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostListItem = props => {
  const { post } = props;
  return(
    <Wrapper>
      <div>{props.i}</div>
      <BtnWrapper>
        <Btn>up</Btn>
        <Btn>down</Btn>
      </BtnWrapper>
      <Post>
        <Title><Link to={`post/${post.id}`}>{post.title}</Link></Title>
        <SubTitle>Submitted by: { post.creator.username }</SubTitle>
      </Post>
    </Wrapper>
  );
};

export default PostListItem;

const Wrapper = styled.div`
  margin: 2rem 2.5rem;
  padding: 1.5rem 2rem;
  border: 1px solid black;  
  display: flex;
`

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 2rem;
  width: 5%;
`

const Btn = styled.button`
  padding: .5rem .75rem;
  width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Post = styled.div`
  margin-left: 2rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: normal;
`

const SubTitle = styled.p`
  font-size: 1.5rem;
`