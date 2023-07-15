import {average} from "../helper";

export const WatchedSummary = ({watched}) => {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
    const avgUserRating = average(watched.map((movie) => movie.userRating ? movie.userRating : 0)).toFixed(1);
    const avgRuntime = Math.round(average(watched.map((movie) => movie.runTime)));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
};
