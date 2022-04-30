import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../auth/authContext";
import { types } from "../../types/types";

export const LoginScreen = () => {

  // permita navegar hacia una direccion
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const handleLogin = () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Jose'
      }
    }
    dispatch(action);

    // con el replace en true reemplaza la historia en lugar de crear una nueva entrada en la historia
    // eso hace que cuando se seleccione la fecla de back no vuelva a la pagina de login porque ahora es una nueva historia
    navigate('/marvel', {
      replace: true
    });
  }

  return (
    <div className='container mt-5'>
      <h1>Login</h1>
      <hr/>
      <button
        class="btn btn-primary"
        onClick={ handleLogin }
      >
          Login
      </button>
    </div>
  )
}
