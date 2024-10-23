import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice.js';
// it create a store which store all the global state, reducer and action of our application and configure out application for redux app
export const store = configureStore({
  reducer: {
    todos: todoReducer,
  }
})