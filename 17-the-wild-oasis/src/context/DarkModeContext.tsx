import { createContext, ReactNode, useEffect, useMemo, useCallback } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState.ts";

interface DarkModeContextType {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType>({} as DarkModeContextType);

interface DarkModeProviderType {
	children: ReactNode;
}

const DarkModeProvider = ({ children }: DarkModeProviderType) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");
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

export { DarkModeProvider };
