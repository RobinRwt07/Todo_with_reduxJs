import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
// import { deleteTask } from "../redux/todoSlice";
import { toggleCompleteAsync } from "../redux/todoSlice";
import { deleteTaskAsync } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();

	function handleChangeComplete() {
		dispatch(toggleCompleteAsync({
			id: id,
			completed: !completed
		}))
		// dispatch(toggleComplete({
		// 	id: id,
		// 	completed: !completed
		// }))
	}

	function handleDelete() {
		dispatch(deleteTaskAsync(id))
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input type='checkbox' className='mx-2' checked={completed} onChange={handleChangeComplete}></input>
					{title}
				</span>
				<button className='btn btn-danger' onClick={handleDelete}>Delete</button>
			</div>
		</li>
	);
};

TodoItem.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	completed: PropTypes.bool.isRequired,
}

export default TodoItem;
