import "./moviebio-trailer.css";

import { useState, useEffect} from "react"

function MovieBioTrailer({props}) {
    const [trailer, setTrailer] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props}/videos?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US`)
        .then(response => response.json())
        .then(data => {
            setTrailer(data.results.find(el => el.type === "Trailer").key);
        })
    },[props]);

    return (
        <>
            {trailer.length ?
                <div className="container trailer">
                    <iframe className="trailer__video" width="100%" src={`https://www.youtube.com/embed/${trailer}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div> :
                ""
            }
        </>
    )
}

export default MovieBioTrailer