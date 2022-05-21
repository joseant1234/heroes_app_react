import { HeroScreen } from "../../../components/hero/HeroScreen"
import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Pruebas en <HeroScreen/> ', () => {

    test('no debe de mostrar el HeroScreen si no hay un heroe en la url', () => {

        // al no poner un id se va a la ruta '/', para no construir todo el componente, se crea un componente ficticio
        // busca en los routes /
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<HeroScreen/>}></Route>
                    <Route path="/" element={<h1>No Hero page</h1>}></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.find('h1').text().trim()).toBe('No Hero page');
    })

    test('debe de mostrar un héroe si el parámetro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-silver']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen/>}></Route>
                    <Route path="/" element={<h1>No Hero page</h1>}></Route>
                </Routes>
            </MemoryRouter>
        );

        // console.log(wrapper.html())

        expect(wrapper.find('.row').exists()).toBe(true);
    })

    test('debe de regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-silver']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen/>}></Route>
                </Routes>
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    })

    test('debe de mostrar el No Hero Page si no tenemos un héroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-silver123']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<HeroScreen/>}></Route>
                    <Route path="/" element={<h1>No Hero page</h1>}></Route>
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('No Hero page')
    })

})
