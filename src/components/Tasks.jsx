import { useTaskContext } from "../contexts/TaskContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { UserContextProvider } from "../contexts/UserContext";

import Welcome from "./Welcome";
import TodoList from "./todo/TodoList";
import UserRegistration from "./registration/UserRegistration";
import TempConverter from "./temp/TempConverter";

const Tasks = () => {
	const { mode, themeStyle } = useThemeContext();
	const { state } = useTaskContext();
	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	return (
		<main style={{ backgroundColor: theme.body, color: theme.text }} className="h-screen">
			{state.defaultPage && <Welcome />}
			{state.todoPage && <TodoList />}
			<UserContextProvider>
				{state.registationPage && <UserRegistration />}
			</UserContextProvider>
			{state.tempConverterPage && <TempConverter />}
		</main>
	);
};

export default Tasks;
