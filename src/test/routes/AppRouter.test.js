import { AppRouter } from "../../components/routers/AppRouter";
import { mount } from 'enzyme';
import { AuthContext } from "../../auth/authContext";


describe('Pruebas en <AppRouter />', () => {

    test('debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            user: {
                logged: false
            }
        };

        // no se usa el shallow xq este solo tendría hasta el nodo de BrowserRouter y no se vería lo q hay adentro
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login')
    })

    test('debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'Jose'
            }
        };

        // no se usa el shallow xq este solo tendría hasta el nodo de BrowserRouter y no se vería lo q hay adentro
        const wrapper = mount(
            <AuthContext.Provider value={contextValue} >
                <AppRouter />
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    })
})
