import {createContext, useEffect, useContext, useReducer, useMemo, useCallback} from "react";
import {BASE_URL} from "../util.js";

const CitiesContext = createContext();

const initialState = {
	cities     : [],
	isLoading  : false,
	currentCity: {},
	error      : ""
};
const reducer = (state, action) => {
	switch (action.type) {
		case "loading":
			return {...state, isLoading: true};
		case "cities/loaded":
			return {
				...state,
				isLoading: false,
				cities   : action.payload
			};
		case "city/loaded":
			return {
				...state,
				isLoading  : false,
				currentCity: action.payload
			};
		case "city/created":
			return {
				...state,
				isLoading  : false,
				cities     : [...state.cities, action.payload],
				currentCity: action.payload
			};
		case "city/deleted":
			return {
				...state,
				isLoading  : false,
				cities     : state.cities.filter(city => city.id !== action.payload),
				currentCity: {}
			};
		case "rejected":
			return {...state, isLoading: false, error: action.payload};
		default:
			throw new Error("Unknown action type");
	}
};

const CitiesProvider = ({children}) => {
	const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchCities() {
			dispatch({type: "loading"});
			try {
				const res = await fetch(`${BASE_URL}/cities`);
				const data = await res.json();
				dispatch({type: "cities/loaded", payload: data});
			} catch (e) {
				dispatch({action: "rejected", payload: "Error loading data."});
			}
		}

		fetchCities();
	}, []);

	const getCity = useCallback(async (id) => {
		if (Number(id) === currentCity.id) {
			return;
		}
		console.log("sadasd");
		dispatch({type: "loading"});
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({type: "city/loaded", payload: data});
		} catch (e) {
			dispatch({type: "rejected", payload: "Error getting city data."});
		}
	}, [currentCity.id]);

	const createCity = async (newCity) => {
		dispatch({type: "loading"});
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method : "POST",
				body   : JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const data = await res.json();
			dispatch({type: "city/created", payload: data});
		} catch (e) {
			dispatch({type: "rejected", payload: "Error creating city."});
		}
	};

	const deleteCity = async (id) => {
		dispatch({type: "loading"});
		try {
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: "DELETE"
			});
			dispatch({type: "city/deleted", payload: id});
		} catch (e) {
			dispatch({type: "rejected", payload: "Error deleting city."});
		}
	};

	const value = useMemo(() => {
		return {
			cities,
			isLoading,
			error,
			currentCity,
			getCity,
			createCity,
			deleteCity
		};
	}, [cities, currentCity, error, getCity, isLoading]);

	return (
		<CitiesContext.Provider value={value}>
			{children}
		</CitiesContext.Provider>
	);
};

const useCities = () => {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error("CitiesContext was used outside the CitiesProvider");
	}
	return context;
};

export {CitiesProvider, useCities};
