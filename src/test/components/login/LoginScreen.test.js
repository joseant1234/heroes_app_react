import { LoginScreen } from "../../../components/login/LoginScreen"
import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { types } from "../../../types/types";
import { AuthContext } from "../../../auth/authContext";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas in <LoginComponent />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de realizar el dispatch y la navegación', () => {

        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect(contextValue.dispatch).toHaveBeenLastCalledWith({
            type: types.login,
            payload: { name: 'Jose' }
        });

        expect(mockNavigate).toHaveBeenCalledWith('/marvel', {replace: true});

        localStorage.setItem('lastPath', '/dc')
        // vovler autenticar para ver si guardo el último path
        handleClick();
        expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true });

    })
})
