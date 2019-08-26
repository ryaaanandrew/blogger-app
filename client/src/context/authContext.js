import React, { useState, createContext, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../queries/queries';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [loginUser] = useMutation(LOGIN);

  useEffect(() => {
    if(sessionStorage.getItem('app-data')) {
      const data = JSON.parse(sessionStorage.getItem('app-data'));
      setUserId(data.userId);
      setToken(data.token);
    };
  });

  const login = async (email, password) => {
    const user = await loginUser({ variables: { email, password }});
    const { userId, token } = user.data.login;
    setUserId(userId);
    setToken(token);
    sessionStorage.setItem('app-data', JSON.stringify({ "token": token, "userId": userId }));
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
