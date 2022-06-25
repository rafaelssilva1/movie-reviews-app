import "./localstorage.css";

import MovieBio from "../pages/moviebio";
import MoviesByGenre from "../pages/moviesbygenre";
import BackToTop from "./backtotop";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function LocalStorage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("movies"));
        setItems(items);
    }, []);

    return (
        <div className="container watchlist padding-bottom">
            <h1 className="watchlist__title">Watchlist</h1>
            {items.length ?
                <div className="movie__grid">
                    {items.map(el => (
                        <article key={el.id} className="movie__article">
                            <Link to={`/movies/bio/${el.id}`} element={<MovieBio />}>
                                <div className="movie__link">
                                    <picture className="movie__picture">
                                        <img className="movie__image" src={el.img} alt={el.title + " Movie Poster"} />        
                                    </picture>
                                    <div className="movie__info">
                                        <h2 className="movie__title">{el.title}</h2>
                                        <div className="movie__truncate">
                                            <p className="movie__description">{el.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div> :
                <div className="watchlist__notfound">
                    <h2>Here you can save any movie you want to see later!</h2>
                    <Link to={"/movies"} element={<MoviesByGenre />}>
                        <button className="button">Explore movies</button>
                    </Link>
                </div>
            }
            <BackToTop />
        </div>
    )
}

export default LocalStorage