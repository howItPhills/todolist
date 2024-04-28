import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { propChangeHandler } from "../../../utils/utils";

export type TodolistType = {
  id: string;
  title: string;
  filterParam: FilterParamsType;
};

export type FilterParamsType = "all" | "active" | "done";

export type TodolistsStateType = {
  todolistsArray: TodolistType[];
};

const initialState: TodolistsStateType = {
  todolistsArray: [],
};

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    addTodolist(state, action: PayloadAction<{ id: string; title: string }>) {
      const newTodolist: TodolistType = {
        id: action.payload.id,
        title: action.payload.title,
        filterParam: "all",
      };
      state.todolistsArray = [newTodolist, ...state.todolistsArray];
    },
    changeTodolistFilter(
      state,
      action: PayloadAction<{ id: string; newFilterParam: FilterParamsType }>
    ) {
      const { payload } = action;
      state.todolistsArray = propChangeHandler(
        state.todolistsArray,
        payload.id,
        "filterParam",
        payload.newFilterParam
      );
    },
    changeTodolistTitle(
      state,
      action: PayloadAction<{ id: string; newTitle: string }>
    ) {
      const { payload } = action;
      state.todolistsArray = propChangeHandler(
        state.todolistsArray,
        payload.id,
        "title",
        payload.newTitle
      );
    },
    removeTodolist(state, action: PayloadAction<{ id: string }>) {
      const { payload } = action;
      state.todolistsArray = state.todolistsArray.filter(
        (todolist) => todolist.id !== payload.id
      );
    },
  },
});

export const {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
} = todolistsSlice.actions;

export const todolistReducer = todolistsSlice.reducer;
