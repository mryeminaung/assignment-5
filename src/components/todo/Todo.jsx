import React, { useEffect, useReducer, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useTodoContext } from "../../contexts/TodoContext";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todo = () => {
	const { dispatch, searchQuery, setSearchQuery } = useTodoContext();
	const { themeStyle, mode } = useThemeContext();
	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	return (
		<section className="container min-h-screen py-32 mx-auto h-full flex flex-col items-center justify-center">
			<div
				className="w-[90%] md:w-[600px] p-6 py-10 rounded-lg border shadow-sm shadow-[#61dafb80] border-[#61dafb]"
				style={{ backgroundColor: theme.bg }}
			>
				{/* add new task to todo list  */}
				<AddTodo />

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

				{/* if search query, show filtered tasks. if not , show todo lists  */}
				<TodoList />
			</div>
		</section>
	);
};

export default Todo;
