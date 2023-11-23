import { FaTrashCan } from "react-icons/fa6";
import { useTodoContext } from "../../contexts/TodoContext";

// to display all the tasks : todo list or filtered tasks
const TodoItem = ({ task }) => {
	const { dispatch } = useTodoContext();

	return (
		<li className="border border-[#61DAFB] p-2 rounded-md flex items-center justify-between">
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

export default TodoItem;
