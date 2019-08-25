import { gql } from 'apollo-boost';

export const getPostsQuery = gql`
  {
    posts {
      id
      title
      content
    }
  }
`