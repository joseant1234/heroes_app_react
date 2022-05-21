import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext  } from '../../auth/authContext';
import { PrivateRoute } from '../../components/routers/PrivateRoute';

// un componente es una funcion q regresa JSX
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aqui</span>
}))

describe('Pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si está autenticado y guardado en el localstorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Jose'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Private Component');
        // se espera q se llame a lastPath con / xq se está en esa ruta la cual se definió en el initialEntries
        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", '/')
    })


    test('debe de bloquear el componente si no está autenticado', () => {
        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Saliendo de aqui')
    })
})
