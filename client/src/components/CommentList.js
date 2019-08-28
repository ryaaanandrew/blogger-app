import React from 'react';
import styled from 'styled-components';

const CommentList = ({ userComment }) => {
  const { comment, creator} = userComment

  return(
    <Wrapper>
      <Comment>
        {comment}
      </Comment>
      <Username>
        posted by {creator.username}
      </Username>
    </Wrapper>
  );
};

export default CommentList;

const Wrapper = styled.div`
  border: 1px solid black;
  width: 70%;
  padding: 1.5rem 2rem
`
const Comment = styled.h1`
  font-size: 1.8rem;
  font-weight: normal;
`

const Username = styled.h4`
  font-size: 1.3rem;
  font-weight: normal;
`