import { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
	defaultPage: true,
	todoPage: false,
	registationPage: false,
	tempConverterPage: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "show_todo_page": {
			return {
				defaultPage: false,
				todoPage: true,
				registationPage: false,
				tempConverterPage: false,
			};
		}
		case "show_registration_page": {
			return {
				defaultPage: false,
				todoPage: false,
				registationPage: true,
				tempConverterPage: false,
			};
		}
		case "show_tempConverter_page": {
			return {
				defaultPage: false,
				todoPage: false,
				registationPage: false,
				tempConverterPage: true,
			};
		}
		default:
			return initialState;
	}
};

const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const { defaultPage, todoPage, registationPage, tempConverterPage } = state;
		defaultPage && (document.title = "Assignment 5");
		todoPage && (document.title = "To-do List");
		registationPage && (document.title = "User Registration");
		tempConverterPage && (document.title = "Temperature Conversion");
	}, [state]);

	return (
		<TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
	);
};

export const useTaskContext = () => {
	return useContext(TaskContext);
};

export default TaskContext;
