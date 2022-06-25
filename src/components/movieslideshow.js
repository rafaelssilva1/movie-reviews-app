import "../components/movieslideshow.css";

import { useState, useEffect} from "react";

import MovieCard from "./moviecard";

function MovieSlideShow (props) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        let pageNumber = Math.floor(Math.random() * 5 + 1);
        fetch(`https://api.themoviedb.org/3/movie/${props.category}?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&page=${pageNumber}`)
        .then(response => response.json())
        .then(data => {
            setMovie(data.results);
        });
    },[props]);

    const moveLeft = (e) => {
        const slideShow = e.target.parentElement.previousElementSibling;
        let slideShowWidth = slideShow.getBoundingClientRect().width;
        slideShow.scrollLeft -= (slideShowWidth/movie.length)*3;
    }

    const moveRight = (e) => {
        const slideShow = e.target.parentElement.previousElementSibling.previousElementSibling;
        let slideShowWidth = slideShow.getBoundingClientRect().width;
        slideShow.scrollLeft += (slideShowWidth/movie.length)*3;
    }

    return (
        <>
            <div className="movieslideshow__header">
                <h2>{props.title}</h2>
                <div className="movieslideshow__bar"></div>
            </div>
            <div className="movieslideshow">
                <MovieCard movie={movie} css="movieslideshow"/>
                <button className="movieslideshow__slidebutton movieslideshow__slidebutton--left" onClick={moveLeft}>
                    <span className="material-icons-outlined">
                        keyboard_arrow_left
                    </span>
                </button>
                <button className="movieslideshow__slidebutton movieslideshow__slidebutton--right" onClick={moveRight}>
                    <span className="material-icons-outlined">
                        keyboard_arrow_right
                    </span>
                </button>
            </div>
        </>
    )
}

export default MovieSlideShow