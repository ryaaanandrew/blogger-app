import React, { useState } from 'react';
import styled from 'styled-components';

const CommentForm = () => {
  const [comment, setComment] = useState('');

  return(
    <Wrapper>
      <Form>
        <Label htmlFor="comment">Leave a comment</Label>
        <textarea 
          name="comment" 
          cols="50" 
          rows="15" 
          onChange={e => setComment(e.target.value)}
          value={comment}
          placeHolder="leave a comment..."
          >
        </textarea>
      </Form>
    </Wrapper>
  );
};

export default CommentForm;

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 2rem 2.5rem;
  width: 30%;
  margin: 0 auto;
`

const Form = styled.form`
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Label = styled.h1`
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 2rem;
`