import {createContext, useContext, useState, useEffect, useMemo} from "react";

function formatTime(date) {
	return new Intl.DateTimeFormat("en", {
		month : "short",
		year  : "2-digit",
		hour  : "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}).format(date);
}

const TimeContext = createContext();


const TimeProvider = ({children}) => {
	const [allowSound, setAllowSound] = useState(true);
	const [time, setTime] = useState(formatTime(new Date()));

	useEffect(function () {
		const id = setInterval(function () {
			setTime(formatTime(new Date()));
		}, 1000);

		return () => clearInterval(id);
	}, []);

	const value = useMemo(() => {
		return {
			allowSound,
			setAllowSound,
			time,
			setTime
		};
	}, [allowSound, time]);

	return (
		<TimeContext.Provider value={value}>
			{children}
		</TimeContext.Provider>
	);
};

const useTime = () => {
	const context = useContext(TimeContext);
	if (context === undefined) {
		throw new Error("TimeContext was used out TimeProvider");
	}
	return context;
};

export {TimeProvider, useTime};
