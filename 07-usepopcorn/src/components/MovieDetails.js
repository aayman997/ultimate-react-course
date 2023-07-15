import {useEffect, useRef, useState} from "react";
import {KEY} from "../helper";
import {useKey} from "../hooks/useKey";
import {ErrorMessage} from "./utils/ErrorMessage";
import {Loader} from "./utils/Loader";
import StarRating from "./utils/StarRating";

export const MovieDetails = ({selectedId, onMovieClose, onAddWatched, watched}) => {
    const [movie, setMovie] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const countRef = useRef(0);

    useEffect(() => {
        if (userRating) {
            countRef.current++;
        }
    }, [userRating]);

    const isWatched = watched.findIndex(movie => movie.imdbID === selectedId) > -1;
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

    const {
        Title   : title,
        Year    : year,
        Poster  : poster,
        Runtime : runTime,
        Plot    : plot,
        Released: released,
        Actors  : actors,
        Director: director,
        Genre   : genre,
        imdbRating
    } = movie;

    useEffect(() => {
        if (!title) {
            return;
        }
        document.title = `Movie | ${title}`;
        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);

    const fetchMovieData = async (movieId) => {
        try {
            setError("");
            setIsLoading(true);
            setError("");
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${movieId}`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error("Something went wrong with fetching movies");
            }
            if (data.Response === "False") {
                throw new Error("Movie not found");
            }
            setMovie(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMovieData(selectedId);
    }, [selectedId]);

    useKey("Escape", onMovieClose);

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbID              : selectedId,
            title,
            year,
            poster,
            imdbRating          : Number(imdbRating),
            runTime             : Number(runTime.split(" ").at(0)),
            userRating          : Number(userRating),
            countRatingDecisions: countRef.current
        };

        onAddWatched(newWatchedMovie);
        onMovieClose();
    };
    return (
        <div className="details">
            {isLoading && <Loader />}
            {error && !isLoading && <ErrorMessage message={error} />}
            {!isLoading && !error &&
                <>
                    <header>
                        <button className="btn-back" onClick={onMovieClose}>&larr;</button>
                        <img src={poster} alt={`Poster of ${title} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{released} &bull; {runTime}</p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched
                             ? <>
                                 <StarRating onSetRating={setUserRating} size={18} maxRating={10} />
                                 {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                             </>
                             : <p>
                                 You rated this movie with {watchedUserRating}
                                 <span>⭐</span>
                             </p>
                            }
                        </div>
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
        </div>
    );
};
