import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginScreen } from '../login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter = () => {
  return (
    <BrowserRouter>        
        <Routes>        
            <Route path="/login" element={<LoginScreen />} />
            {/* si no es login /* cualquier otra ruta se manejara por el dashboardroutes */}
            <Route path="/*" element={ <DashboardRoutes /> }/>
        </Routes>
    </BrowserRouter>    
  )
}
