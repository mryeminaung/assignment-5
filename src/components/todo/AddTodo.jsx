import { useTodoContext } from "../../contexts/TodoContext";

const AddTodo = () => {
	const { dispatch, task, setTask } = useTodoContext();

	return (
		<div className="flex flex-col md:flex-row items-start md:items-center gap-x-3 gap-y-3">
			<input
				type="text"
				name="task"
				id="task"
				placeholder="Enter a new task"
				className="border border-[#61DAFB] text-black p-2 rounded-md w-full md:w-3/4 focus:outline-none"
				value={task}
				onChange={(e) => setTask(e.target.value)}
			/>
			<button
				className="border border-[#61DAFB] font-semibold p-2 w-full md:w-1/4 rounded-md hover:bg-[#61DAFB]  hover:text-black transition-colors duration-200"
				onClick={() => {
					if (task) {
						dispatch({ type: "addTask", payload: task });
						setTask("");
					} else {
						alert("Type task name");
					}
				}}
			>
				Add
			</button>
		</div>
	);
};

export default AddTodo;
