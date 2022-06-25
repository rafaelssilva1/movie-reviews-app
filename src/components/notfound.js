import "./notfound.css";
import Logo from "../assets/logo.svg";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MovieBio from "../pages/moviebio";

function NotFound() {
    const [random, setRandom] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * (500 +1))}`)   
                .then(response => response.json())
                .then(data => {
                    setRandom(data.results[Math.floor(Math.random() * (data.results.length - 1))]);
                });
    },[]);

    return (
        <div className="container notfound padding-bottom">
            <h1>Oops, the page you were looking for was not found...</h1>
            <p>While you're at it, explore this random movie we found for you:</p>
            <div className="card__div">
                <div className="card__imagediv">
                    <picture className="card__picture">
                        <img className="card__image" src={random.poster_path != null ? `https://image.tmdb.org/t/p/w342/${random.poster_path}` : Logo} alt={random.title + " Movie Poster"} />
                    </picture>
                </div>
                <div className="card__info">
                    <h1 className="card__title">{random.title}</h1>
                    <div className="card__truncate">
                        <p className="card__overview">{random.overview}</p>
                    </div>
                    <div>
                        <Link to={`/movies/bio/${random.id}`} element={<MovieBio />}>
                            <button className="button">
                                Movie details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound