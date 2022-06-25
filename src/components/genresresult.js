import "./genresresult.css";
import { useState, useEffect} from "react";

import BackToTop from "./backtotop";
import MovieCard from "./moviecard";

let currentPage = 1;

function GenresResult({props}) {

    const [movie, setMovieSearch] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&include_adult_false&with_genres=${props}`)
        .then(response => response.json())
        .then(data => {
            setMovieSearch(data.results)
        });
    },[props]);

    const loadMore = (e) => { //update currentPage var, make new API call and push to current array
        currentPage = currentPage + 1
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&include_adult_false&with_genres=${props}&=&page=${currentPage}`)
                .then(response => response.json())
                .then(data => {
                    setMovieSearch(movie.concat(data.results))
                });
    };

    return (
        <div className="container genres__result">
            {movie.length !== 0 && (
                <MovieCard movie={movie} css="movie"/>
            )}
            <button className="button genres__button" onClick={loadMore}>
                Load More
            </button>
            <BackToTop />
        </div>
    )
}

export default GenresResult