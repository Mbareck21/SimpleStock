// filepath: e:\projects\SimpleStock\frontend\src\utils\useMediaQuery.js
import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design
 * @param {string} query - Media query string (e.g. '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(query);
		setMatches(mediaQuery.matches);

		const listener = (event) => {
			setMatches(event.matches);
		};

		mediaQuery.addEventListener("change", listener);

		return () => {
			mediaQuery.removeEventListener("change", listener);
		};
	}, [query]);

	return matches;
};

export default useMediaQuery;
