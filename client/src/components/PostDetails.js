import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POST } from '../queries/queries';

const PostDetails = props => {
  const [postData, setPostData] = useState([])
  const { loading, error, data } = useQuery(GET_POST)
  const { id } = props.match.params

  useEffect(() => {
    setPostData(data)
  });

  console.log(data)
  return(
    <h1>Post Details</h1>
  );
};

export default PostDetails;
