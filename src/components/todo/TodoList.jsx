import React, { useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../../contexts/ThemeContext";
import { FaTrashCan } from "react-icons/fa6";

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

const TodoList = () => {
	const [todoList, dispatch] = useReducer(reducer, initialState);
	const [task, setTask] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [doneCount, setDoneCount] = useState(0);
	const { themeStyle, mode } = useThemeContext();

	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(todoList));
		const countDoneTasks = todoList.filter((task) => task.done).length;
		setDoneCount(countDoneTasks);
	}, [todoList]);

	// this function is used to filter tasks based on search query
	const filteredTasks = todoList.filter((task) =>
		task.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// to display all the tasks : todo list or filtered tasks
	const displayTasks = (task) => {
		return (
			<li
				key={task.id}
				className="border border-[#61DAFB] p-2 rounded-md flex items-center justify-between"
			>
				<p className="space-x-2">
					<input
						type="checkbox"
						name={task.name}
						id={task.id}
						checked={task.done}
						className="accent-red-500"
						onChange={(e) => {
							dispatch({
								type: "doneTask",
								checked: e.target.checked,
								id: task.id,
							});
						}}
					/>
					<label htmlFor={task.id} className={`${task.done && "line-through"}`}>
						{task.name}
					</label>
				</p>
				<button
					className="text-red-500 px-2 text-xl"
					onClick={() => {
						dispatch({ type: "deleteTask", payload: task.id });
					}}
				>
					<FaTrashCan />
				</button>
			</li>
		);
	};

	return (
		<section className="container py-24 mx-auto h-full flex flex-col items-center justify-center">
			<div
				className="w-[600px] p-6 py-10 rounded-lg border shadow-sm shadow-[#61dafb80] border-[#61dafb]"
				style={{ backgroundColor: theme.bg }}
			>
				{/* add new task to todo list */}
				<div className="flex items-center gap-x-3">
					<input
						type="text"
						name="task"
						id="task"
						placeholder="Enter a new task"
						className="border border-[#61DAFB] text-black p-2 rounded-md w-3/4 focus:outline-none"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
					<button
						className="border border-[#61DAFB] font-semibold p-2 w-1/4 rounded-md hover:bg-[#61DAFB]  hover:text-black transition-colors duration-200"
						onClick={() => {
							dispatch({ type: "addTask", payload: task });
							setTask("");
						}}
					>
						Add
					</button>
				</div>

				{/* search task or tasks from todo list */}
				<div className="mt-3">
					<input
						type="text"
						name="task"
						id="task"
						placeholder="Type something to search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border border-[#61DAFB] text-black p-2 rounded-md w-full focus:outline-none"
					/>
				</div>

				{/* clear all tasks from todo list */}
				<button
					className="border border-[#61DAFB] hover:bg-[#61DAFB] hover:text-black mt-3 py-2 w-full font-semibold rounded-md transition-colors duration-200"
					onClick={() => {
						dispatch({ type: "clearTasks" });
					}}
				>
					Clear Tasks
				</button>

				<div className="my-2">
					<div className="flex items-center justify-between border-y border-[#61DAFB]">
						<h2 className="text-2xl font-bold py-2">Tasks</h2>

						{/* display the number of done tasks */}
						{todoList.length > 0 && (
							<span className="text-xl">
								Done {doneCount} of {todoList.length}
							</span>
						)}
					</div>

					<ul className="w-full space-y-3 mt-3">
						{/* 
						if search query, show filtered tasks. if not , show todo lists 
						*/}
						{searchQuery ? (
							filteredTasks.length > 0 ? (
								filteredTasks.map((task) => displayTasks(task))
							) : (
								<h2 className="font-bold text-3xl text-center bg-gray-300 rounded-lg py-3 text-black border border-[#61DAFB]">
									No matching tasks
								</h2>
							)
						) : todoList.length > 0 ? (
							todoList.map((task) => displayTasks(task))
						) : (
							<h2 className="font-bold text-3xl text-center bg-gray-300 rounded-lg py-3 text-black border border-[#61DAFB]">
								Nothing to show
							</h2>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default TodoList;
