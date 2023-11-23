import { useThemeContext } from "../contexts/ThemeContext";
import { useTaskContext } from "../contexts/TaskContext";
import { FaMoon, FaSun } from "react-icons/fa6";
import reactLogo from "../assets/react.svg";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { themeStyle, mode, setMode } = useThemeContext();
	const { state, dispatch } = useTaskContext();
	const [type, setType] = useState(localStorage.getItem("type") || "home");
	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	useEffect(() => {
		localStorage.setItem("type", type);
		type === "home" && dispatch({ type: "" });
		type === "to-do" && dispatch({ type: "show_todo_page" });
		type === "user-reg" && dispatch({ type: "show_registration_page" });
		type === "temp-convert" && dispatch({ type: "show_tempConverter_page" });
	}, [type]);

	return (
		<div
			className="fixed top-0 left-0 right-0 shadow-md"
			style={{ color: theme.text, backgroundColor: theme.bg }}
		>
			<nav className="px-5 md:px-2 container mx-auto py-5">
				<div className="flex items-center justify-between">
					<header className="hidden sm:block">
						<button
							className="flex items-center gap-x-1"
							onClick={() => {
								dispatch({ type: "" });
							}}
						>
							<img src={reactLogo} alt="" className="w-auto" />
							<span className="font-bold text-xl text-[#61DAFB] ">React</span>
						</button>
					</header>

					<button
						className="hidden md:block task--btn"
						onClick={() => {
							dispatch({ type: "show_todo_page" });
						}}
					>
						To-Do List
					</button>
					<button
						className="hidden md:block task--btn"
						onClick={() => {
							dispatch({ type: "show_registration_page" });
						}}
					>
						User Registration
					</button>
					<button
						className="hidden md:block task--btn"
						onClick={() => {
							dispatch({ type: "show_tempConverter_page" });
						}}
					>
						Temperature Converter
					</button>

					<select
						className="block md:hidden appearance-none text-center font-bold text-base border rounded-md hover:cursor-pointer text-black px-3 py-2 border-[#61DAFB] outline-none "
						name="task"
						id="task"
						value={type}
						onChange={(e) => setType(e.target.value)}
					>
						<option value="home">Home</option>
						<option value="to-do">To-do List</option>
						<option value="user-reg">User Registration</option>
						<option value="temp-convert">Temp Converter</option>
					</select>

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
