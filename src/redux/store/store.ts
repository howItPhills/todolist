import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { todolistReducer } from "../reducers/todolists/todolists-slice";
import { todosReducer } from "../reducers/todos/todos-slice";

export type RootStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todolists: todolistReducer,
  todos: todosReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
