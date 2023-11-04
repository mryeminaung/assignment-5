import { ThemeContextProvider } from "./contexts/ThemeContext";
import { TaskContextProvider } from "./contexts/TaskContext";
import Navbar from "./components/Navbar";
import Tasks from "./components/Tasks";

const App = () => {
	return (
		<ThemeContextProvider>
			<TaskContextProvider>
				<Navbar />
				<Tasks />
			</TaskContextProvider>
		</ThemeContextProvider>
	);
};

export default App;
