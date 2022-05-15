import { SearchScreen } from "../../components/search/SearchScreen"
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en <SearchScreen/> ', () => {

    test('debe de mostrarse correctamente con valores por defecto', () => {

        // se usa memoryrouter porque pide que usenavigate solo puede ser usado en el contexto del router
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <SearchScreen/>
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');
    })


})
