import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext'

// los componentes hijos se reciben a traves de la pop children
export const PrivateRoute = ({ children }) => {

    const { user } = useContext(AuthContext);
    // internamente useLocation tiene su state por eso cada vez q se cambia la ruta se redibuja el componente xq cambia el estado
    const { pathname, search } = useLocation();
    localStorage.setItem('lastPath', pathname + search);

    // Navigate es un componente que permite navegar a cualquier ruta
    return user.logged
        ? children
        : <Navigate to="/login" />
}
