import "./search.css";

import { useState, useEffect} from "react";
import { useParams } from "react-router-dom";

import BackToTop from "./backtotop";
import MovieCard from "./moviecard";

function Search() {
    const { string } = useParams();

    const [movie, setMovieSearch] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&include_adult=false&query=${string}`)
        .then(response => response.json())
        .then(data => {
            setMovieSearch(data.results);
        })
    },[string]);

    return (
        <div className="container padding-top padding-bottom">
            <div className="movie">
                {movie.length === 0 && (
                    <h2 className="movie__error">An error has ocurred try again.</h2>
                )}
                {movie.length !== 0 && (
                    <MovieCard movie={movie} css="movie" />
                )}
            </div>
            <BackToTop />
        </div>
    )
}

export default Search