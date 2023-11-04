import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

	useEffect(() => {
		localStorage.setItem("theme", mode);
	}, [mode]);

	const themeStyle = {
		light: {
			bg: "#fff",
			body: "#fff",
			text: "#000",
		},
		dark: {
			bg: "#08011C",
			body: "#0C0628",
			text: "#fff",
		},
	};

	return (
		<ThemeContext.Provider value={{ mode, setMode, themeStyle }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
