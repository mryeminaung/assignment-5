import { useThemeContext } from "../contexts/ThemeContext";
import { useTaskContext } from "../contexts/TaskContext";
import { FaMoon, FaSun } from "react-icons/fa6";

const Navbar = () => {
	const { themeStyle, mode, setMode } = useThemeContext();
	const { dispatch } = useTaskContext();

	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	return (
		<div
			className="fixed top-0 left-0 right-0 shadow-md"
			style={{ color: theme.text, backgroundColor: theme.bg }}
		>
			<nav className="container mx-auto py-5">
				<div className="flex items-center justify-between">
					<header className="hidden lg:block">
						<a href="/" className="flex items-center gap-x-1">
							<img src="/src/assets/react.svg" alt="" className="w-auto" />
							<span className="font-bold text-xl text-[#61DAFB] ">React</span>
						</a>
					</header>
					<button
						className="task--btn"
						onClick={() => {
							dispatch({ type: "show_todo_page" });
						}}
					>
						To-Do List
					</button>
					<button
						className="task--btn"
						onClick={() => {
							dispatch({ type: "show_registration_page" });
						}}
					>
						User Registration
					</button>
					<button
						className="task--btn"
						onClick={() => {
							dispatch({ type: "show_tempConverter_page" });
						}}
					>
						Temperature Converter
					</button>
					<div className="theme-toggler">
						<input
							type="checkbox"
							className="checkbox"
							id="checkbox"
							checked={mode === "dark"}
							onChange={() => {
								setMode((preMode) => (preMode === "light" ? "dark" : "light"));
							}}
						/>
						<label htmlFor="checkbox" className="checkbox-label">
							<FaMoon className="text-black" />
							<FaSun className="text-white" />
							<span className="ball"></span>
						</label>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
