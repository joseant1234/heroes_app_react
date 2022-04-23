import { useMemo } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { getHeroById } from "../../selectors/getHeroById";

export const HeroScreen = () => {
  const { heroId } = useParams();
  const navigate = useNavigate();

  // el useMemo memoriza el valor de acuerdo a una dependencia y si esa dependencia cambia vuelve a memorizar
  const hero = useMemo(() => {
    // la funcion dentro del useMemo debe de retornar el valor que se quiere memorizar
    return getHeroById(heroId);
  }, [heroId])
  // lo que esta en [] es la dependencia. Si heroId cambia se volverá a ejecutar la funcion dentro de useMemo

  // if (!hero) return <p>No hay heroe</p>
  if (!hero) {
    // componente ficticio para hacer un redirect hacia otra ruta
    return <Navigate to="/" />
  }

  const handleReturn = () => {
    // con el -1 va a la pagina anterior del historial
    navigate(-1);
  }

  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;

  const imagePath = `/assets/${id}.jpg`;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img src={imagePath} alt={superhero} className="img-thumbnail"/>
      </div>

      <div className="col-8">
        <h3>{ superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego:</b>
            { alter_ego }
          </li>
          <li className="list-group-item">
            <b>Publisher:</b>
            { publisher }
          </li>
          <li className="list-group-item">
            <b>First appearance:</b>
            { first_appearance }
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{ characters }</p>

        <button
          className="btn btn-outline-info"
          onClick={ handleReturn }
        >
          Regresar
        </button>
      </div>
    </div>
  )
}
