import "./moviebio-reviews.css";

import { useState, useEffect, useContext} from "react";
import { ReviewContext } from "../contexts/review-context";

function MovieBioReviews({props}) {
    const {review} = useContext(ReviewContext);

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props}/reviews?api_key=fc6299fc3f6fe2d5a1a9bfa2ef65cd7e&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            setReviews(data.results);
        });
    },[props]);

    useEffect(() => {
        if (Object.keys(review).length) {
            setReviews(old => [...old, review]);
        };
      }, [review]);

    const readMore = (e) => {
        if(e.target.previousSibling.firstElementChild.hasAttribute("class", "reviews__content")) {
            e.target.previousSibling.firstElementChild.removeAttribute("class", "reviews__content");
            e.target.textContent = "Show less";
        } else {
            e.target.previousSibling.firstElementChild.setAttribute("class", "reviews__content");
            e.target.textContent = "Show more";
        }
    }

    return (
        <div className="container relative">
            <div className="movieslideshow__header">
                <h2>Honest Reviews</h2>
                <div className="movieslideshow__bar"></div>
            </div>
            {reviews.length
                ?
                <div className="reviews__grid">
                    {reviews.map(el => (
                        <article key={el.author_details.username} className="reviews__article">
                            <div className="reviews__author">
                                <p className="reviews__name">{el.author}</p>
                                <small>{el.created_at.slice(0,10)}</small>
                            </div>
                            {el.author_details.rating
                                ?
                                <div className="reviews__stars">
                                    {el.author_details.rating}
                                    <span className="reviews__icon material-icons-outlined">star</span>
                                </div>
                                :
                                <div className="reviews__stars">
                                    N/A
                                </div>
                            }
                            <div className="reviews__truncate">
                                <p className="reviews__content" dangerouslySetInnerHTML={{__html: el.content}}></p>
                            </div>
                            {el.content.length > 400 ? <button className="reviews__button" onClick={readMore}>
                                Show more
                            </button> : ""}
                        </article>
                    ))}
                </div>
                :
                <div className="reviews__noreviews">
                    <p>No reviews so far! Be the first one!</p>                 
                </div>
            }
        </div>
    )
}

export default MovieBioReviews