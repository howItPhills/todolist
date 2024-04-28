import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v1 } from "uuid";
import { propChangeHandler } from "../../../utils/utils";

export type TodoType = {
  id: string;
  text: string;
  isDone: boolean;
};

export type TodosType = {
  [key: string]: TodoType[];
};

export type TodosStateType = {
  todosMap: TodosType;
};

const initialState: TodosStateType = {
  todosMap: {},
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodosArray(state, action: PayloadAction<{ todolistId: string }>) {
      const { todolistId } = action.payload;
      state.todosMap = { [todolistId]: [], ...state.todosMap };
    },
    removeTodosArray(state, action: PayloadAction<{ todolistId: string }>) {
      const { payload } = action;
      state.todosMap = Object.keys(state.todosMap)
        .filter((id) => id !== payload.todolistId)
        .reduce(
          (acc, currId) => ({ ...acc, [currId]: state.todosMap[currId] }),
          {}
        );
    },
    addTodo(
      state,
      action: PayloadAction<{ todolistId: string; text: string }>
    ) {
      const { todolistId, text } = action.payload;
      const newTodo: TodoType = {
        id: v1(),
        text,
        isDone: false,
      };
      state.todosMap[todolistId].unshift(newTodo);
    },
    changeTodoText(
      state,
      action: PayloadAction<{ todolistId: string; id: string; newText: string }>
    ) {
      const { id, newText, todolistId } = action.payload;
      const todosArray = state.todosMap[todolistId];
      state.todosMap[todolistId] = propChangeHandler(
        todosArray,
        id,
        "text",
        newText
      );
    },
    changeTodoStatus(
      state,
      action: PayloadAction<{
        todolistId: string;
        id: string;
        newStatus: boolean;
      }>
    ) {
      const { id, newStatus, todolistId } = action.payload;
      const todosArray = state.todosMap[todolistId];
      state.todosMap[todolistId] = propChangeHandler(
        todosArray,
        id,
        "isDone",
        newStatus
      );
    },
    removeTodo(
      state,
      action: PayloadAction<{ todolistId: string; id: string }>
    ) {
      const { id, todolistId } = action.payload;
      const todosArray = state.todosMap[todolistId];
      state.todosMap[todolistId] = todosArray.filter((todo) => todo.id !== id);
    },
  },
});

export const {
  addTodosArray,
  removeTodosArray,
  addTodo,
  changeTodoStatus,
  changeTodoText,
  removeTodo,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
