import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useState } from "react";

//components 
import Nav from "./components/nav";
import Footer from "./components/footer";
import NotFound from "./components/notfound";
import Search from "./components/search";

//pages
import Home from "./pages/home";
import Movies from "./pages/movies";
import MoviesByGenre from "./pages/moviesbygenre";
import MovieBio from "./pages/moviebio";
import MovieNightIdeas from "./pages/movienightideas";
import WatchList from "./pages/watchlist";

//contexts
import { ReviewContext} from "./contexts/review-context";
import { ReleaseDateContext } from "./contexts/release-date-context";

function App() {
  const [review, setReview] = useState([]);
  const [release, setRelease] = useState([]);

  return (
    <ReviewContext.Provider value={{review, setReview}}>
      <ReleaseDateContext.Provider value={{release, setRelease}}>
        <Nav />
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MoviesByGenre />} />
            <Route path="/movies/:id/:bio" element={<MovieBio />} />
            <Route path="/movie-night-ideas" element={<MovieNightIdeas />} />
            <Route path="/search/:string" element={<Search />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ReleaseDateContext.Provider>
    </ReviewContext.Provider>
  );
}

export default App;
