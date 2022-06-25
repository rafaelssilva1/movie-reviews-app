import "./random.css";
import Logo from "../assets/logo.svg";
import Video from "../assets/random_loading.mp4"

import { useState } from "react";
import { Link } from "react-router-dom";

import MovieBio from "../pages/moviebio";
import BackToTop from "./backtotop";

function Random() {
    const [random, setRandom] = useState([]);
    const [display, setDisplay] = useState(false);

    const fetchRandom = () => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * (500 +1))}`)   
                .then(response => response.json())
                .then(data => {
                    const randomMovie = data.results[Math.floor(Math.random() * (data.results.length - 1))];
                    setRandom(old => [randomMovie, ...old]);
                    setDisplay(true);
                })
    }

    return (
        <>
            <div className="container random">
                {!display && (
                    <video width="50%" height="auto" autoPlay loop muted className="random__video">
                        <source src={Video} type="video/mp4" />
                    </video>
                )}
                <h2>Click the button to find a movie idea!</h2>
                <button className="button random__button" onClick={fetchRandom}>Find me a movie!</button>
            </div>
            <div className="container padding-bottom">
                <div className="container card">
                    {random.length !== 0
                    ?
                    <div>
                        {random.map(el => (
                            <div className="card__div" key={el.id}>
                                <div className="card__imagediv">
                                    <picture className="card__picture">
                                        <img className="card__image" src={el.poster_path != null ? `https://image.tmdb.org/t/p/w342/${el.poster_path}` : Logo} alt={el.title + " Movie Poster"} />
                                    </picture>
                                </div>
                                <div className="card__info">
                                    <h1 className="card__title">{el.title}</h1>
                                    <div className="card__truncate">
                                        <p className="card__overview">{el.overview}</p>
                                    </div>
                                    <div>
                                        <Link to={`/movies/bio/${el.id}`} element={<MovieBio />}>
                                            <button className="button">
                                                Movie details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    ""
                    }
                </div>
            </div>
            <BackToTop />
        </>
    )
}

export default Random