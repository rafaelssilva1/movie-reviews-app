import "./localstoragebutton.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function LocalStorageButton() {
    const { bio } = useParams();

    const storeItems = JSON.parse(localStorage.getItem("movies")) || [];
    const [items, setItems] = useState([...storeItems]);

    useEffect(() => { // on page load check if movie is stored in localstorage
        localStorage.setItem("movies", JSON.stringify(items));
        let movieExists = items.some(obj => obj.id === bio);
        if (movieExists) {
            document.querySelector(".localstorage__button > .material-icons-outlined").textContent = "favorite"
        };
    }, [items]);

    const addLocalStorage = (e) => { //navigate the html tag and save to or remove from localstorage
        let result = {
            id: e.target.parentElement.parentElement.getAttribute("movie-id"),
            title: e.target.parentElement.previousElementSibling.firstElementChild.textContent,
            summary: e.target.parentElement.previousElementSibling.firstElementChild.nextSibling.nextSibling.textContent,
            img: e.target.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute("src")
        };
        let movieExists = items.some(obj => obj.id === result.id); //checks if the movie is already saved in localstorage
        if (!movieExists) { // if movie exists removes it and changes icon
            setItems(old => [{
                id: e.target.parentElement.parentElement.getAttribute("movie-id"),
                title: e.target.parentElement.previousElementSibling.firstElementChild.textContent,
                summary: e.target.parentElement.previousElementSibling.firstElementChild.nextSibling.nextSibling.nextSibling.textContent,
                img: e.target.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute("src")
            }, ...old]);
            e.target.textContent = "favorite";

        } else { // border icon if movies doesn't exist in localstorage
            let aux = items.filter(el =>
                el.id !== e.target.parentElement.parentElement.getAttribute("movie-id")
            );
            setItems(aux);
            e.target.textContent = "favorite_border";
        }
        
    }

    return (
        <button className="localstorage__button" onClick={addLocalStorage}>
            <span className="material-icons-outlined">
                favorite_border
            </span>
        </button>
    )
}

export default LocalStorageButton