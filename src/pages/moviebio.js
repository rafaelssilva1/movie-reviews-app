import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import MovieBioTrailer from "../components/moviebio-trailer";
import MovieBioCard from "../components/moviebio-card";
import MovieBioActors from "../components/moviebio-actors";
import MovieBioReviews from "../components/moviebio-reviews";
import FormReview from "../components/formreview";
import NotReleased from "../components/notreleased"

import { ReleaseDateContext } from "../contexts/release-date-context";

function MovieBio(props) {
    const {release} = useContext(ReleaseDateContext);
    const { bio } = useParams();

    const [released, setReleased] = useState(false);

    useEffect(() => {
        if (release.length) {
            const today = new Date().getTime()
            const filtered = [...release].filter(e => e !== "-")
            const releaseDate = new Date(filtered[0]+filtered[1]+filtered[2]+filtered[3], filtered[5]-1, filtered[7]).getTime()

            today > releaseDate ? setReleased(true) : setReleased(false)
        };
      }, [release]);

    return (
        <>
            <MovieBioTrailer props={bio} />
            <MovieBioCard props={bio}/>
            <MovieBioActors props={bio}/>
            {
                released
                ?
                <>
                    <MovieBioReviews props={bio}/>
                    <FormReview />
                </>
                :
                <NotReleased />
            }
        </>
    )
}

export default MovieBio