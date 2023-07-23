import {useRef} from "react";
import {useKey} from "../hooks/useKey";

export const Search = ({query, setQuery}) => {
	const searchEl = useRef(null);

	useKey("Enter", () => {
		if (document.activeElement === searchEl.current) {
			return;
		}
		searchEl.current.focus();
		setQuery("");
	});

	return (
		<input
			ref={searchEl}
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	);
};
