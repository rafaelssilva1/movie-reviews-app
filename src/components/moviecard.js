import Logo from "../assets/logo.svg";

import { Link } from "react-router-dom";

import MovieBio from "../pages/moviebio";

function MovieCard(props) {
    const movieArr = props.movie
    return (
        <div className={`${props.css}__grid`}>
            {movieArr.map(el => (
                <article key={el.id} className={`${props.css}__article`}>
                    <Link to={`/movies/bio/${el.id}`} element={<MovieBio />}>
                        <div className="movie__link">
                            <picture className="movie__picture">
                                <img className="movie__image" src={el.poster_path !== null ? `https://image.tmdb.org/t/p/w342${el.poster_path}` : Logo} alt={el.title + " Movie Poster"} />        
                            </picture>
                            <div className="movie__info">
                                <h2 className="movie__title">{el.title}</h2>
                                <div className="movie__vote">
                                    <span >{el.vote_average}</span>
                                    <span className="material-icons-outlined">
                                        star
                                    </span>
                                </div>
                                <div className="movie__truncate">
                                    <p className="movie__description">{el.overview}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    )
}

export default MovieCard