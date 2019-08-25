import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getPostsQuery } from '../queries/queries';

const PostList = () => {
  const { loading, error, data } = useQuery(getPostsQuery);  

  if(loading) return <h1>Loading...</h1>;

  return(
    <>
      <h2>Posts</h2>
      <ul>
        { data.posts.map(post => <li>{post.title}</li>) }
      </ul>
    </>
    
  );
};

export default PostList;
