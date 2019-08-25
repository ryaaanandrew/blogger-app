import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import NavBar from './components/NavBar';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/' exact component={PostList} />
          <Route path='/createpost' component={CreatePost} />
          <Route path='/post/:id' component={PostDetails} />
        </Switch>          
      </BrowserRouter>
    </ApolloProvider>
      );
}

export default App;
