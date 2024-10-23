import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos } from '../redux/todoSlice';
import { getTodosAsync } from '../redux/todoSlice';
import { useEffect } from 'react';
const TodoList = () => {
	const todos = useSelector(selectTodos);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	if (todos.length == 0) {
		return <div>No Tasks Available</div>
	}
	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				<TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;
