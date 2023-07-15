import {useState} from "react";

function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const getPosition = () => {
        if (!navigator.geolocation) {
            return setError("Your browser does not support geolocation");
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        );
    };

    return {position, isLoading, error, getPosition};
}

export default function UseGeolocation() {
    const {
        position: {lat, lng},
        getPosition,
        isLoading,
        error
    } = useGeolocation();

    const [countClicks, setCountClicks] = useState(0);

    function handleClick() {
        setCountClicks((count) => count + 1);
        getPosition();
    }

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                Get my position
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p>
                    Your GPS position:{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                    >
                        {lat}, {lng}
                    </a>
                </p>
            )}

            <p>You requested position {countClicks} times</p>
        </div>
    );
}
