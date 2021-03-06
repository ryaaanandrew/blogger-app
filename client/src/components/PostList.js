import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { getPostsQuery } from '../queries/queries';
import PostListItem from './PostListItem';

const PostList = () => {
  const { loading, data } = useQuery(getPostsQuery);  

  if(loading) return <h1>Loading...</h1>;

  return(
    <Wrapper>
      <h1>Posts</h1>
      <ul>
        { data && data.posts.map((post, i) => <PostListItem post={post} index={i} key={post.id}/>) }
      </ul>
    </Wrapper>
  );
};

export default PostList;

const Wrapper = styled.div`
  width: 80%;
  border: 1px solid black;
  margin: 0 auto;
  padding: 2rem 3rem;
`
const Post = styled.li`
  font-size: 2rem;
  border: 1px solid black;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
`
