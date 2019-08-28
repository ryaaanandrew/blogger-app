import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FETCH_POST } from '../queries/queries';
import { PostContext } from '../context/postContext';
import { AuthContext } from '../context/authContext';

const CommentForm = props => {
  const [comment, setComment] = useState('');

  return(
    <Wrapper>
      <Form onSubmit={e => props.handleSubmit(e, comment)}>
        <Label htmlFor="comment">Leave a comment</Label>
        <textarea 
          name="comment" 
          cols="50" 
          rows="15" 
          onChange={e => setComment(e.target.value)}
          value={comment}
          placeholder="leave a comment..."
          >
        </textarea>
        <button>Submit</button>
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