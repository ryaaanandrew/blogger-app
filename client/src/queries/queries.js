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

export const GET_POST = gql`
  query($id: ID) {
    post(id: $id) {
      title
      content
      id
    }
  }
`

export const CREATE_POST = gql`
  mutation ($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      id
      title
      content
    }
  }
`