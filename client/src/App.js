import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import PostList from './components/PostList';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <PostList />
    </ApolloProvider>
  );
}

export default App;
