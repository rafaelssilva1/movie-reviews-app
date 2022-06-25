import "./backtotop.css";

import { useState, useEffect } from "react";

function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            window.pageYOffset > window.innerHeight ? setShow(true) : setShow(false);
        })
    },[]);

    const backToTop = () => {
        window.scrollTo({top:0,left:0, behavior: "smooth"});
    };

    return (
        <div className="backtotop" id={show ? "backtotop__display" : ""} onClick={backToTop}>
            <button className="backtotop__button">
                <span className="material-icons-outlined">arrow_upward</span>
            </button>
        </div>
    )
}

export default BackToTop