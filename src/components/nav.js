import "./nav.css";
import Logo from "../assets/logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Home from "../pages/home";
import GenresPage from "../pages/movies";
import MovieNightIdeas from "../pages/movienightideas";
import WatchList from "../pages/watchlist";

function Nav() {
    const [hamburguer, setHamburguer] = useState(false);
    
    const burguerClick = () => {
        setHamburguer(!hamburguer);
    }

    let navigate = useNavigate();

    const searchField = e => {
        let navSearch = document.querySelector("#navSearch");
        e.preventDefault();

        if (navSearch.value) {
            navigate(`/search/${navSearch.value.replaceAll(" ", "-").toLowerCase()}`);
            navSearch.value = "";
            removeActive();
        };
    }

    const removeActive = () => {
        setHamburguer(false);
    }

    return (
        <header className="header">
            <nav className="container nav">
                <div className="nav__logo" onClick={removeActive}>
                    <Link to="/" element={<Home />}><img src={Logo} alt="logo"/></Link>
                </div>
                <ul className={`nav__links ${ hamburguer ? "active" : ""}`}>
                    <li onClick={removeActive}>
                        <Link to="movies" element={<GenresPage />}>All Movies</Link>
                    </li>
                    <li onClick={removeActive}>
                        <Link to="movie-night-ideas" element={<MovieNightIdeas />}>Movie Night Ideas</Link>
                    </li>
                    <li onClick={removeActive}>
                        <Link to="watchlist" element={<WatchList />}>Watchlist</Link>
                    </li>

                    <form className="nav__form" onSubmit={searchField}>
                        <button className="nav__search">
                            <span className="material-icons-outlined">
                                search
                            </span>
                        </button>
                        <input type="text" id="navSearch" className="nav__input" placeholder="Find any movie..." />
                    </form>
                </ul>
                <div className="nav__hamburguer" onClick={burguerClick}>
                    <span className="material-icons-outlined">menu</span>
                </div>
            </nav>
        </header>
    )
}

export default Nav