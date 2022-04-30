import { useEffect, useReducer } from 'react';
import { AppRouter } from './components/routers/AppRouter'
import { AuthContext } from './auth/authContext';
import { authReducer } from './auth/authReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
}

export const HeroesApp = () => {
  // el estado inicial será lo q envíe la funcion init
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      dispatch
    }}>
      <AppRouter />
    </AuthContext.Provider>
  )
}
