import { gql } from 'apollo-boost';

export const getPostsQuery = gql`
  {
    posts {
      id
      title
      content
      score
      creator {
        id
        username
      }
    }
  }
`

export const FETCH_POST = gql`
  query($id: ID) {
    post(id: $id) {
      title
      content
      score
      id
      comments{
        comment
        creator {
          username
        }
      }
      creator {
        id
        email
        username
      }
    }
  }
`
export const GET_COMMENTS = gql`
  query($postId: ID) {
    fetchComments(postId: $postId) {
      comment
      creator {
        username
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation($title: String!, $content: String!, $creatorId: String!) {
    createPost(title: $title, content: $content, creatorId: $creatorId) {
      id
      title
      content
      creator {
        id
        email
        username
      }
    }
  }
`

export const UPDATE_SCORE = gql`
  mutation($postId: ID!, $score: Int!) {
    updateScore(postId: $postId, score: $score) {
      id
      title
      score
    }
  }
`

export const CREATE_USER = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      email
      username
      password
    }
  }
`

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      expiresIn
    }
  }
`