import React, { createContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_SCORE } from '../queries/queries';

export const PostContext = createContext();

const PostContextProvider = props => {
  const [updateScore, { err, data }] = useMutation(UPDATE_SCORE);
  const upVote = (postId, score) => {
    let newScore = score;
    newScore++;
    updateScore({ variables: { postId, score: newScore }});
  };
  const downVote = (postId, score) => {
    let newScore = score;
    newScore--;
    updateScore({ variables: { postId, score: newScore }});
  };
  return(
    <PostContext.Provider value={{ upVote, downVote }}>
      { props.children }
    </PostContext.Provider>
  );
};

export default PostContextProvider;
