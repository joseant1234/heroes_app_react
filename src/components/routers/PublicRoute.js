import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext'

// los componentes hijos se reciben a traves de la pop children
export const PublicRoute = ({ children }) => {

    const { user } = useContext(AuthContext);

    // Navigate es un componente que permite navegar a cualquier ruta

    return user.logged
        ? <Navigate to="/marvel" />
        : children
}
