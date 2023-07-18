import {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import {Button} from "../Buttons/Button.jsx";
import {BackButton} from "../Buttons/BackButton.jsx";
import {useURLPosition} from "../../hooks/useURLPosition.js";
import Message from "../Message/Message.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import {convertToEmoji} from "../../util.js";
import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";
import {useCities} from "../../contexts/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";


function Form() {
	const [lat, lng] = useURLPosition();
	const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");
	const [geoCodingError, setGeoCodingError] = useState("");
	const {createCity, isLoading} = useCities();
	const navigate = useNavigate();
	useEffect(() => {
		if (!lat && !lng) {
			return;
		}

		(async () => {
			setIsLoadingGeoCoding(true);
			setGeoCodingError("");
			try {
				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				if (!data.countryCode) {
					throw new Error("That doesn't seem to be a city. CLick somewhere else 😉");
				}
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (e) {
				setGeoCodingError(e.message);
			} finally {
				setIsLoadingGeoCoding(false);
			}
		})();
	}, [lat, lng]);

	if (isLoadingGeoCoding) {
		return <Spinner />;
	}

	if (geoCodingError) {
		return <Message message={geoCodingError} />;
	}

	if (!lat && !lng) {
		return <Message message="Start by Clicking somewhere on the map" />;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(e);
		if (!cityName || !date) {
			return;
		}
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: {
				lat,
				lng
			}
		};
		await createCity(newCity);
		navigate("/app/cities");
	}

	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input
					id="cityName"
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker
					id="date"
					onChange={date => setDate(date)}
					selected={date}
					dateFormat="dd/MM/yyyy"
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea
					id="notes"
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<BackButton />
				<Button type="primary">Add</Button>
			</div>
		</form>
	);
}

export default Form;
