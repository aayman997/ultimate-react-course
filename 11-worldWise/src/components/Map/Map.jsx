import styles from "./Map.module.css";
import {useSearchParams, useNavigate} from "react-router-dom";

export const Map = () => {
	const navigate = useNavigate();
	const [searchParams, setSearch] = useSearchParams();
	const lat = searchParams.get("lat");
	const lng = searchParams.get("lng");

	return (
		<div className={styles.mapContainer} onClick={() => navigate("form")}>
			<h1>Map</h1>
			<h1>Position: {lat}, {lng}</h1>
			<button
				onClick={() => {
					setSearch({lat: 23, lng: 50});
				}}
			>Set Pos
			</button>
		</div>
	);
};
