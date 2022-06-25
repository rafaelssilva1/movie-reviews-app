import { useParams } from 'react-router-dom';
import GenresAside from '../components/genresaside';
import GenresResult from '../components/genresresult';


function MoviesByGenre() {

    const { id } = useParams();

    return (
        <div className="genres padding-bottom">
            <GenresAside />
            <GenresResult props={id}/>
        </div>
    );
}

export default MoviesByGenre