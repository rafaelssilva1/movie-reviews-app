import "./genres.css";

import GenresAside from "./genresaside";
import GenresResult from "./genresresult";

function GenresResults() {

    return (
        <div className="genres padding-bottom">
            <GenresAside />
            <GenresResult />
        </div>
    )
}

export default GenresResults
