import { createContext, useEffect, useReducer, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("tasks")) || [];

const reducer = (state, action) => {
	switch (action.type) {
		case "addTask":
			return [...state, { id: uuidv4(), name: action.payload, done: false }];

		case "deleteTask":
			return state.filter((task) => task.id !== action.payload);

		case "doneTask":
			return state.map((task) => {
				return task.id === action.id ? { ...task, done: action.checked } : task;
			});

		case "clearTasks":
			return [];

		default:
			return state;
	}
};

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
	const [todoList, dispatch] = useReducer(reducer, initialState);
	const [task, setTask] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [doneCount, setDoneCount] = useState(0);

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(todoList));
		const countDoneTasks = todoList.filter((task) => task.done).length;
		setDoneCount(countDoneTasks);
	}, [todoList]);

	return (
		<TodoContext.Provider
			value={{
				todoList,
				dispatch,
				task,
				setTask,
				doneCount,
				setDoneCount,
				searchQuery,
				setSearchQuery,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

export const useTodoContext = () => {
	return useContext(TodoContext);
};

export default TodoContext;
