import { useTaskContext } from "../contexts/TaskContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { UserContextProvider } from "../contexts/UserContext";
import { TodoContextProvider } from "../contexts/TodoContext";
import Welcome from "./Welcome";
import Todo from "./todo/Todo";
import UserRegistration from "./registration/UserRegistration";
import TempConverter from "./temp/TempConverter";

const Tasks = () => {
	const { mode, themeStyle } = useThemeContext();
	const { state } = useTaskContext();
	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	return (
		<main
			style={{ backgroundColor: theme.body, color: theme.text }}
			className="h-full min-h-screen"
		>
			{state.defaultPage && <Welcome />}
			<TodoContextProvider>{state.todoPage && <Todo />}</TodoContextProvider>
			<UserContextProvider>
				{state.registationPage && <UserRegistration />}
			</UserContextProvider>
			{state.tempConverterPage && <TempConverter />}
		</main>
	);
};

export default Tasks;
