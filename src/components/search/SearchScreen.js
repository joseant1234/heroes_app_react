import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import { useMemo } from 'react';


export const SearchScreen = () => {

  const navigate = useNavigate();
  // el location contine la ubicacion en donde se encuentra actualmente
  const location = useLocation();
  // se obtiene en forma dict los queryParams
  // si q no existe usa el valor vacío
  const { q = ''} = queryString.parse(location.search)

  const [formValues, handleInputChange] = useForm({
    searchText: q
  });

  const { searchText } = formValues;
  // se memoriza el resultado para q cada vez q cambie solo el queryParams (q) se haga el getHeroesByName
  // si no se memoriza con escribir algo en la caja texto (cambio en el estado) hará q se ejecute otra vez getHeroesByName
  const heroesFiltered = useMemo(() => {
   return getHeroesByName(q);
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    // pone en navegador el param y carga el componente, en el query param q el valor de searchText
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />

       <div className='row'>
         <div className='col-5'>
           <h4>Buscar</h4>
           <hr />
           <form onSubmit={handleSearch}>
             <input
               type="text"
               placeholder="Buscar un héroe"
               className="form-control"
               name="searchText"
               autoComplete='off'
               value={searchText}
               onChange={ handleInputChange }
             />

            <button
              className='btn btn-outline-primary mt-1'
              type="submit"
            >
              Buscar ...
            </button>
          </form>
         </div>

        <div className='col-7'>
          <h4>Resultados</h4>
          <hr/>
          {
            (q === '')
              ? <div className='alert alert-info'>Buscar un héroe</div>
              : ( heroesFiltered.length === 0)
                && <div className='alert alert-danger'>No hay resultados: {q}</div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero}
              />
            ))
          }
        </div>
       </div>
    </>
  )
}
