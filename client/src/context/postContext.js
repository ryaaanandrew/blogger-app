import React, { createContext } from 'react';

export const PostContext = createContext();

const PostContextProvider = props => {
 
  const upVote = () => {

  };
  
  return(
    <PostContext.Provider>
      { props.children }
    </PostContext.Provider>
  );
};

export default PostContextProvider;
