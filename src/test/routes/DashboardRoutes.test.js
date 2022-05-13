import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../components/routers/DashboardRoutes';


describe('Pruebas en <DasboardRoutes />', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'Jose'
        }
    }

    test('debe de mostrarse correctamente', () => {
        // MemoryRouter permite hacer pruebas como si se estuviera en el navegador web
        // para este caso se usa el memoryRouter para que el useNavigation que se usa por ejemplo en el componente SearchScreen sea provisto
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Jose');
    })
})
