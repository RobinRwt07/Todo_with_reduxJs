import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

//  it will create and return thunk which act as action that we dispatch from component

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const res = await axios.get('http://localhost:7000/todos');
    if (res.status === 200) {
      const todos = res.data;
      return { todos }
    }
    else {
      return res
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  'todo/addTodoAsync',
  async (title, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:7000/todos', { title }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const todo = res.data;
      return todo;
    }
    catch (err) {
      return rejectWithValue("failed to create task" + err);
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  'todo/toggleCompleteAsync',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`http://localhost:7000/todos/${data.id}`, { completed: data.completed });
      const todo = res.data;
      return todo;
    }
    catch (err) {
      return rejectWithValue("Failed to update Resource" + err);
    }
  }
)

export const deleteTaskAsync = createAsyncThunk(
  'todo/deleteTaskAsync',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`http://localhost:7000/todos/${id}`);
      const todos = res.data;
      return { todos };
    }
    catch (err) {
      return rejectWithValue("failed to delete resource" + err)
    }
  }
)

export const deleteAllTaskAsync = createAsyncThunk(
  'todos/deleteAllTaskAsync',
  async () => {
    try {
      const res = await axios.delete('http://localhost:7000/todos');
      return res.data;
    } catch (error) {
      return error;
    }
  }
)

export const todoSlice = createSlice({
  initialState: [],
  name: "todo",
  reducers: {
    addTask: (state, action) => {
      const newTodo = {
        id: new Date().getTime(),
        title: action.payload.title,
        completed: false,
      }
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      return state.map(todo => {
        if (action.payload.id !== todo.id) {
          return todo;
        }
        else {
          return {
            ...todo,
            completed: action.payload.completed
          }
        }
      });
    },
    deleteTask: (state, action) => {
      return state.filter(todo => todo.id !== action.payload.id);
    },
    deleteAllTask: (state, action) => {
      console.log(action);
      state.length = 0;
    }
  },
  // this is used to handle the async operation
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload.todos;
    }),
      builder.addCase(getTodosAsync.rejected, (state, action) => {
        console.log("Failed to load Data", action.payload);
      }),
      builder.addCase(getTodosAsync.pending, (state, action) => {
        console.log("Fetching data from server...", action);
      }),
      builder.addCase(addTodoAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      }),
      builder.addCase(toggleCompleteAsync.fulfilled, (state, action) => {
        const index = state.findIndex(todo => todo.id === action.payload.id);
        state[index].completed = action.payload.completed;
      }),
      builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
        return action.payload.todos;
      }),
      builder.addCase(deleteAllTaskAsync.fulfilled, (state, action) => {
        return action.payload;
      })
  }

})

// selector for getting the value from redux toot state
export const selectTodos = (state) => state.todos;

export const { addTask, toggleComplete, deleteTask, deleteAllTask } = todoSlice.actions;

export default todoSlice.reducer;