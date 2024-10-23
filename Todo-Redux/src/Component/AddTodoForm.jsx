import { useState } from "react";
// import { addTask } from "../redux/todoSlice";
import { useDispatch } from 'react-redux';
import { addTodoAsync, deleteAllTaskAsync } from "../redux/todoSlice";

const AddTodoForm = () => {
	const [value, setValue] = useState('');
	const dispatch = useDispatch(); // return dispatch function from the store

	const onSubmit = (event) => {
		event.preventDefault();
		if (value.length !== 0) {
			dispatch(
				addTodoAsync(value)
			); // it will dispatch addTask action
			setValue("");
		}
		else {
			console.log("Empty task");
		}
	};

	function handleDelete() {
		dispatch(deleteAllTaskAsync());
	}

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<label className='sr-only'>Name</label>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<div className="d-flex align-content-center gap-3 mt-4">
				<button type='submit' className='btn btn-primary' >
					Submit
				</button>
				<button type="button" className="btn btn-danger" onClick={handleDelete}>Delete All</button>
			</div>
		</form>
	);
};

export default AddTodoForm;