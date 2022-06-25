import "./moviebio-card.css";

import Logo from "../assets/logo.svg";

import { useState, useEffect, useContext} from "react";
import { useParams } from 'react-router-dom';

import WhereToWatch from "./wheretowatch";
import LocalStorageButton from "./localstoragebutton";

import { ReleaseDateContext } from "../contexts/release-date-context";

function MovieBioCard({props}) {
    const {release, setRelease} = useContext(ReleaseDateContext);
    const { bio } = useParams();

    const [info, setInfo] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props}?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US`)
        .then(response => response.json())
        .then(data => {
            setInfo(data);
            setGenres(data.genres);
            setRelease(data.release_date)
        });
    },[props]);

    return (
        <div className="container card">
            <div className="card__div" movie-id={info.id}>
                <div className="card__imagediv">
                    <picture className="card__picture">
                        <img className="card__image" src={info.poster_path != null ? `https://image.tmdb.org/t/p/w342${info.poster_path}` : Logo} alt={info.title + " Movie Poster"} />
                    </picture>
                </div>
                <div className="card__info">
                    <h1 className="card__title">{info.title}</h1>
                    <div className="movie__vote">
                        <span>{info.vote_average}</span>
                        <span className="material-icons-outlined">
                            star
                        </span>
                    </div>
                    <div className="card__basicinfo">
                        <span className="card__year">{info.release_date}, </span>
                        {genres.map((el, index) => (
                            <span className="card__genreitem" key={el.id}>{(index ? '/' : '') + el.name}</span>
                        ))}
                        <span className="card__runtime">, {info.runtime} mins</span>
                    </div>
                    <div className="card__truncate">
                        <p className="card__overview">{info.overview}</p>
                    </div>
                    <div className="card__wheretowatch">
                        <WhereToWatch watch={bio}/>
                    </div>
                </div>
                <LocalStorageButton />
            </div>
        </div>
    )
}

export default MovieBioCard