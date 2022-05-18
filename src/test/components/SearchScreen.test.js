import { SearchScreen } from "../../components/search/SearchScreen"
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";

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


})
