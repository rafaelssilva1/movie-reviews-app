import "./notreleased.css";

import { useContext } from "react";

import { ReleaseDateContext } from "../contexts/release-date-context";

function NotReleased() {
    const {release} = useContext(ReleaseDateContext);

    return (
        <div className="container padding-bottom notreleased">
            <div className="movieslideshow__header">
                <div className="movieslideshow__bar"></div>
            </div>
            <h2 className="notreleased__title">This movie wasn't released yet! Leave an honest review after the <br /><span className="notreleased_date">{release}</span></h2>
            
        </div>
    );
}

export default NotReleased