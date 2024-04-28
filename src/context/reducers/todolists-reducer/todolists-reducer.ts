import { FilterParamsType, TodolistType } from "../../AppContext";
import { propChangeHandler } from "../../../utils/utils";

//ACTION.TYPE VARIABLES
export const ADD_TODOLIST = "ADD_TODOLIST";
const CHANGE_TODOLIST_STATUS = "CHANGE_TODOLIST_STATUS";
const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE";
export const REMOVE_TODOLIST = "REMOVE_TODOLIST";

// ACTION TYPES
export type AddTodolistActionType = {
  type: typeof ADD_TODOLIST;
  id: string;
  title: string;
};

type ChangeTodolistStatusType = {
  type: typeof CHANGE_TODOLIST_STATUS;
  id: string;
  newFilterParam: FilterParamsType;
};

type ChangeTodolistTitleType = {
  type: typeof CHANGE_TODOLIST_TITLE;
  id: string;
  newTitle: string;
};

export type RemoveTodolistType = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

export type TodolistUnionActionType =
  | AddTodolistActionType
  | ChangeTodolistStatusType
  | ChangeTodolistTitleType
  | RemoveTodolistType;

// REDUCER
export const todolistsReducer = (
  state: TodolistType[],
  action: TodolistUnionActionType
): TodolistType[] => {
  const { type } = action;
  switch (type) {
    case ADD_TODOLIST: {
      const { title, id } = action;
      const newTodolist: TodolistType = {
        id,
        title,
        filterParam: "all",
      };
      const newState = [newTodolist, ...state];
      return newState;
    }
    case CHANGE_TODOLIST_STATUS: {
      const { id, newFilterParam } = action;
      return propChangeHandler(state, id, "filterParam", newFilterParam);
    }
    case CHANGE_TODOLIST_TITLE: {
      const { id, newTitle } = action;
      return propChangeHandler(state, id, "title", newTitle);
    }

    case REMOVE_TODOLIST: {
      const { id } = action;
      return state.filter((todolist) => todolist.id !== id);
    }
    default:
      return state;
  }
};

// ACTION CREATORS
export const addTodolistAC = (
  title: string,
  id: string
): AddTodolistActionType => {
  return {
    type: ADD_TODOLIST,
    title,
    id,
  };
};

export const changeTodolistFilterParamAC = (
  id: string,
  newFilterParam: FilterParamsType
): ChangeTodolistStatusType => {
  return {
    type: CHANGE_TODOLIST_STATUS,
    id,
    newFilterParam,
  };
};

export const changeTodolistTitleAC = (
  id: string,
  newTitle: string
): ChangeTodolistTitleType => {
  return {
    type: CHANGE_TODOLIST_TITLE,
    id,
    newTitle,
  };
};

export const removeTodolistAC = (id: string): RemoveTodolistType => {
  return {
    type: REMOVE_TODOLIST,
    id,
  };
};
