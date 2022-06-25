import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

import "./hero.css";

import MovieBio from "../pages/moviebio";

function Hero() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&page=1&include_video=false`)
        .then(response => response.json())
        .then(data => {
            setMovies(data.results.sort(() => 0.5 - Math.random()).slice(0, 5))
        });
    },[]);
    
    const [current, setCurrent] = useState(0);

    const showPrevious = () => {
        let prev = current - 1;
        if (prev < 0) {
            prev = movies.length - 1
        };
        setCurrent(prev);
    }
    const showNext = () => {
        let next = current + 1
        if (next >= movies.length) {
            next = 0;
        }
        setCurrent(next);
    }

    return (
        <div className="heroContainer">
            {movies.map((el, index) => (
                <div className={`hero ${ index === current ? "hero--active" : ""}`} key={el.id} style={{backgroundImage: `url("https://image.tmdb.org/t/p/w1280${el.backdrop_path}")`}}>
                    <div className="hero__text">
                        <h2 className="hero__title">{el.title}</h2>
                        <p className="hero__description">{el.overview}</p>
                        <Link to={`/movies/bio/${el.id}`} element={<MovieBio />}>
                            <button className="button hero__button" movie-id={el.id}>
                                Watch Trailer
                                <span className="material-icons-outlined">
                                    play_circle_filled
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
            <button className="hero__slidebutton hero__slidebutton--left" onClick={showPrevious}>
                <span className="material-icons-outlined">
                    keyboard_arrow_left
                </span>
            </button>
            <button className="hero__slidebutton hero__slidebutton--right" onClick={showNext}>
                <span className="material-icons-outlined">
                    keyboard_arrow_right
                </span>
            </button>
        </div>
    );
}

export default Hero