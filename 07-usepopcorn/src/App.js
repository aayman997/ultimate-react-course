import {useState} from "react";
import {Logo} from "./components/Logo";
import {Main} from "./components/Main";
import {MovieDetails} from "./components/MovieDetails";
import {MovieList} from "./components/MovieList";
import {NavBar} from "./components/NavBar";
import {NumResults} from "./components/NumResults";
import {Search} from "./components/Search";
import {Box} from "./components/utils/Box";
import {ErrorMessage} from "./components/utils/ErrorMessage";
import {Loader} from "./components/utils/Loader";
import {WatchedMovieList} from "./components/WatchedMovieList";
import {WatchedSummary} from "./components/WatchedSummary";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {useMovies} from "./hooks/useMovies";

const App = () => {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, error} = useMovies(query);
    const [watched, setWatched] = useLocalStorage([], "watched");
    const handleSelectedMovie = (id) => {
        setSelectedId(curId => id === curId ? null : id);
    };

    function handleCloseMovie() {
        setSelectedId(null);
    };

    const handleAddWatch = (movie) => {
        setWatched(watched => [...watched, movie]);
    };

    const handleDeleteWatched = (id) => {
        setWatched(watched => watched.filter(movie => movie.imdbID !== id));
    };

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults moviesLength={movies.length} />
            </NavBar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />}
                    {error && query && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {
                        selectedId
                        ? <MovieDetails
                            selectedId={selectedId}
                            onMovieClose={handleCloseMovie}
                            onAddWatched={handleAddWatch}
                            watched={watched}
                        />
                        : <>
                            <WatchedSummary watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    }
                </Box>
            </Main>
        </>
    );
};
export default App;


