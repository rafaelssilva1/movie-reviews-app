import "./wheretowatch.css";
import Logo from "../assets/logo.svg";

import { useState, useEffect} from "react";

function WhereToWatch({watch}) {
    const [array, setArray] = useState([]);
    const [flatrate, setFlatrate] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${watch}/watch/providers?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e`)
        .then(response => response.json())
        .then(data => {
            setArray(data.results);
            setFlatrate(data.results.US.flatrate);
        })
    },[watch]);
    
    if (typeof flatrate !== "undefined" && Object.keys(array).length !== 0 && array.US) {
        return (
            <>
                <h4>Where to Watch:</h4>
                {flatrate.map(el => (
                    <img className="provider" key={el.provider_id} src={el.profile_path !== null ? `https://image.tmdb.org/t/p/w45/${el.logo_path}` : Logo} alt={el.provider_name} />
                ))}
            </>
        )
    } else {
        return ("")
    }

}

export default WhereToWatch