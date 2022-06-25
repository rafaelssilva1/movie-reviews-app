import "./formreview.css";

import { useState, useContext} from "react";

import { ReviewContext } from "../contexts/review-context";

function FormReview() {
    const {review, setReview} = useContext(ReviewContext);

    const [submit, setSubmit] = useState(false);

    const submitReview = (e) => {
        e.preventDefault();
        setSubmit(true);

        const today = new Date();

        setReview({ //set object with the same structure as the API
            author: document.getElementById("review__user").value,
            author_details: {
                username: document.getElementById("review__user").value,
                rating: document.querySelector('input[name="review__rating"]:checked').value
            },
            content: document.getElementById("review__textarea").value,
            created_at: today.getFullYear()+"-"+today.getMonth()+"-"+today.getDay()
        });

        document.querySelector(".review__form").reset();
    }

    return (
        <div className="container review">
            <div className="movieslideshow__header">
                <h2>Leave a Review</h2>
                <div className="movieslideshow__bar"></div>
            </div>
            {!submit ?
                <div>
                    <form className="review__form" onSubmit={submitReview}>
                        <label htmlFor="review__user">Your nickname:</label>
                        <input type="text" id="review__user" name="review__user" required></input>
                        <label htmlFor="review__textarea">Write your review here:</label>
                        <textarea id="review__textarea" name="review__textarea" required></textarea>
                        <div className="review__rating">
                            <p>Leave a rating here:</p>
                            <input type="radio" id="1" name="review__rating" value="1" required/>
                            <label htmlFor="1">1</label>
                            <input type="radio" id="2" name="review__rating" value="2" />
                            <label htmlFor="2">2</label>
                            <input type="radio" id="3" name="review__rating" value="3" />
                            <label htmlFor="3">3</label>
                            <input type="radio" id="4" name="review__rating" value="4" />
                            <label htmlFor="4">4</label>
                            <input type="radio" id="5" name="review__rating" value="5" />
                            <label htmlFor="5">5</label>
                            <input type="radio" id="6" name="review__rating" value="6" />
                            <label htmlFor="6">6</label>
                            <input type="radio" id="7" name="review__rating" value="7" />
                            <label htmlFor="7">7</label>
                            <input type="radio" id="8" name="review__rating" value="8" />
                            <label htmlFor="8">8</label>
                            <input type="radio" id="9" name="review__rating" value="9" />
                            <label htmlFor="9">9</label>
                            <input type="radio" id="10" name="review__rating" value="10" />
                            <label htmlFor="10">10</label>
                        </div>
                        <button type="submit" className="button review__submit">Submit review</button>
                    </form>
                </div> :
                <p className="review__success">Thank you for your submission!</p>
            }
        </div>
    )
}

export default FormReview