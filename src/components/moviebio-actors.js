import "./moviebio-actors";
import Logo from "../assets/logo.svg";

import { useState, useEffect} from "react";

function MovieBioActors({props}) {

    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props}/credits?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US`)
        .then(response => response.json())
        .then(data => {
            setInfo(data.cast);
        });
    },[props]);

    const moveLeft = () => {
        const slideShow = document.querySelector(".movieslideshow__grid");
        let slideShowWidth = slideShow.getBoundingClientRect().width;
        slideShow.scrollLeft -= (slideShowWidth/info.length)*6;
    };

    const moveRight = () => {
        const slideShow = document.querySelector(".movieslideshow__grid");
        let slideShowWidth = slideShow.getBoundingClientRect().width;
        slideShow.scrollLeft += (slideShowWidth/info.length)*6;
    };
    
    return (
        <div className="container relative">
            <div className="movieslideshow__header">
                <h2>Actors and Crew</h2>
                <div className="movieslideshow__bar"></div>
            </div>
            {info.length !== 0
                ?
                <>
                    <div className="movieslideshow__grid">
                        {info.map(el => (
                            <article key={el.id} className="movieslideshow__article"> 
                                <div className="movie__link" actor-id={el.id}>
                                    <picture className="movie__picture">
                                        <img className="movie__image" src={el.profile_path !== null ? `https://image.tmdb.org/t/p/w342/${el.profile_path}` : Logo} alt={el.name} />        
                                    </picture>
                                    <div className="movie__info">
                                        <h3 className="movie__title">{el.name}</h3>
                                        <p className="movie__character">{el.character}</p>
                                        <small className="movie__department">{el.known_for_department}</small>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

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
                </>
                :
                <div className="reviews__noreviews">
                    <p>We have no info about the actors and crew :(</p>                 
                </div>
            }
        </div>
    )
}

export default MovieBioActors