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
  // need to implement limits on voting...add an array of users who voted on post...search for users in post...loop through array and if user has already voted on it, break.
  return(
    <PostContext.Provider value={{ upVote, downVote }}>
      { props.children }
    </PostContext.Provider>
  );
};

export default PostContextProvider;
