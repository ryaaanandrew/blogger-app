import React, { useState, createContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../queries/queries';

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [loginUser, { loading, error, data }] = useMutation(LOGIN);

  const login = async (email, password) => {
    const user = await loginUser({ variables: { email, password }});
    const { userId, token } = user.data.login;
    setUserId(userId);
    setToken(token)
  };

  const logout = () => {

  };

  return(
    <AuthContext.Provider value={{ userId, token, login }}>
      { props.children }
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;