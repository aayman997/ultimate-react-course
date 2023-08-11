import { createContext, useContext, ReactNode, useEffect, useMemo, useCallback } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.ts";

interface DarkModeContextType {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>(false);

interface DarkModeProviderType {
	children: ReactNode;
}

const DarkModeProvider = ({ children }: DarkModeProviderType) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.replace("light-mode", "dark-mode");
		} else {
			document.documentElement.classList.replace("dark-mode", "light-mode");
		}

	}, [isDarkMode]);

	const toggleDarkMode = useCallback(() => {
		setIsDarkMode((isDark: boolean) => !isDark);
	}, [setIsDarkMode]);

	const value = useMemo(() => {
		return {
			isDarkMode,
			toggleDarkMode
		};
	}, [isDarkMode, toggleDarkMode]);

	return (
		<DarkModeContext.Provider value={value}>
			{children}
		</DarkModeContext.Provider>
	);
};

const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error("DarkModeContext was used outside DarkModeProvider");
	}
	return context;

};
export { DarkModeProvider, useDarkMode };
