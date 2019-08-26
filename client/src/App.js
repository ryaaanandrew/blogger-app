import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import AuthContextProvider from './context/authContext';
import NavBar from './components/NavBar';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import PostDetails from './components/PostDetails';
import SignUp from './components/SignUp';
import Login from './components/Login';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthContextProvider>
          <NavBar />
          <Switch>
            <Route path='/' exact component={PostList} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/post/:id' component={PostDetails} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
          </Switch>          
        </AuthContextProvider>
      </BrowserRouter>
    </ApolloProvider>
      );
}

export default App;
