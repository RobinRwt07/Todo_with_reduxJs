
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
	const totalCompleted = useSelector((state) => {
		const completedTodo = state.todos.filter(todo => todo.completed === true)
		return completedTodo.length;
	})
	return <h4 className='mt-3'>Total Complete Items:{totalCompleted}</h4>;
};

export default TotalCompleteItems;
