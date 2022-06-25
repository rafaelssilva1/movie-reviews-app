import Hero from "../components/hero";
import MovieSlideShow from "../components/movieslideshow";

function Home() {
    return (
        <>
            <Hero />
            <div className="padding-bottom container">
                <MovieSlideShow category="popular" title="popular" />
                <MovieSlideShow category="top_rated" title="top rated" />
                <MovieSlideShow category="upcoming" title="upcoming" />
            </div>
        </>
    )
}

export default Home