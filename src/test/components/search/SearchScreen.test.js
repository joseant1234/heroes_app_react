import { SearchScreen } from "../../../components/search/SearchScreen"
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";

// tiene q tener el nombre mockNavigate para q funcione
const mockNavigate = jest.fn();

// cuando se importe react-router-dom se usa el objeto definido dentro de la funcion
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <SearchScreen/> ', () => {

    test('debe de mostrarse correctamente con valores por defecto', () => {

        // se usa memoryrouter porque pide que usenavigate solo puede ser usado en el contexto del router
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');
    })

    test('debe de mostrar a Batman y el input con el valor del queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen/>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input').prop('value')).toBe('batman');
    })

    test('debe de mostrar un error si no se encuentra el hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchScreen/>
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe(`No hay resultados: batman123`);
    })

    test('debe de llamar el navigate a la nueva pantalla', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen/>
            </MemoryRouter>
        );

        // simulate (evento a simular, los parametros del evento)
        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        })

        // tambien se puede hacer con simulate
        // preventDefault: () => == preventDefault(){}
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })
        // lo q se necesita probar es q el navigate fue llamado con ciertos atributos, no q cambie la url porque eso ya lo han probado el equipo de react-router
        // para probar q el navigate fue llamado se hace un mock

        expect(mockNavigate).toHaveBeenCalledWith("?q=batman");
    })

})
