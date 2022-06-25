import "./genresaside.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect} from "react";

import MoviesByGenre from "../pages/moviesbygenre";

function GenresAside() {
    const { id } = useParams();

    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US")
        .then(response => response.json())
        .then(data => {
            setGenre(data.genres)
        })
    },[]);

    return (
        <>
            <div className="genres__title">
                <h1>Search a movie in any genre!</h1>
            </div>
            <div className="container">
                <ul className="genres__list">
                    {genre.map(el => (
                        <Link element={<MoviesByGenre />} to={`/movies/${el.id}`} key={el.id}>
                            <li className="genres__item" id={Number(id) === el.id ? "genres__item--active" : ""} genre={el.id}>{el.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default GenresAside