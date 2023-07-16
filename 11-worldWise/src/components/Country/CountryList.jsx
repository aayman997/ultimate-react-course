import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner.jsx";
import Message from "../Message/Message.jsx";
import CountryItem from "./CountryItem.jsx";

export const CountryList = ({cities, isLoading}) => {
	if (isLoading) {
		return <Spinner />;
	}

	if (!cities.length) {
		return <Message message="Add your first city by clicking a city on the map" />;
	}
	const countries = cities.reduce((arr, city) => {
		if (!arr.map(el => el.country).includes(city.country)) {
			return [...arr, {country: city.country, emoji: city.emoji}];
		} else {
			return arr;
		}
	}, []);
	return (
		<ul className={styles.countryList}>
			{countries.map(country => <CountryItem key={country.country} country={country} />)}
		</ul>
	);
};
