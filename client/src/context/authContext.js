import React, { useState, createContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../queries/queries';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [loginUser] = useMutation(LOGIN);

  const login = async (email, password) => {
    const user = await loginUser({ variables: { email, password }});
    const { userId, token } = user.data.login;
    setUserId(userId);
    setToken(token);

    sessionStorage.setItem('token', JSON.stringify(token));
    // set token to session storeage>>protect end routes w/ auth>>use middleware to compare tokens and if matches then let request go through
  };

  const logout = () => {
    setUserId('');
    setToken('');
    sessionStorage.clear();
  };

  return(
    <AuthContext.Provider value={{ userId, token, login, logout }}>
      { props.children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;