import { v1 } from "uuid";
import { newStateCreator, propChangeHandler } from "../../../utils/utils";
import {
  ADD_TODOLIST,
  AddTodolistActionType,
  REMOVE_TODOLIST,
  RemoveTodolistType,
} from "../todolists-reducer/todolists-reducer";
import { TodoType, TodosType } from "../../AppContext";

//ACTION.TYPE VARIABLES
const ADD_TODO = "ADD_TODO";
const CHANGE_TODO_STATUS = "CHANGE_TODO_STATUS";
const CHANGE_TODO_TEXT = "CHANGE_TODO_TEXT";
const REMOVE_TODO = "REMOVE_TODO";

//ACTION TYPES
type AddTodoActionType = {
  type: typeof ADD_TODO;
  todolistId: string;
  todoText: string;
};

type ChangeTodoStatusActionType = {
  type: typeof CHANGE_TODO_STATUS;
  todolistId: string;
  todoId: string;
  newStatus: boolean;
};

type RemoveTodoActionType = {
  type: typeof REMOVE_TODO;
  todolistId: string;
  todoId: string;
};

type ChangeTodoTextActionType = {
  type: typeof CHANGE_TODO_TEXT;
  todolistId: string;
  todoId: string;
  newText: string;
};

export type TodosUnionActionType =
  | AddTodoActionType
  | ChangeTodoStatusActionType
  | RemoveTodoActionType
  | ChangeTodoTextActionType
  | AddTodolistActionType
  | RemoveTodolistType;

//REDUCER
export const todosReducer = (
  state: TodosType,
  action: TodosUnionActionType
): TodosType => {
  const { type } = action;
  switch (type) {
    case ADD_TODO: {
      const { todolistId, todoText } = action;
      const newTodo: TodoType = {
        id: v1(),
        text: todoText,
        isDone: false,
      };
      const newTodosArray = [newTodo, ...state[todolistId]];
      const newState = newStateCreator(state, todolistId, newTodosArray);
      return newState;
    }
    case CHANGE_TODO_STATUS: {
      const { todolistId, todoId, newStatus } = action;
      const todosArray = state[todolistId];
      const newTodosArray = propChangeHandler(
        todosArray,
        todoId,
        "isDone",
        newStatus
      );
      const newState = newStateCreator(state, todolistId, newTodosArray);
      return newState;
    }
    case REMOVE_TODO: {
      const { todolistId, todoId } = action;
      const todosArray = state[todolistId];
      const newTodosArray = todosArray.filter((todo) => todo.id !== todoId);
      const newState = newStateCreator(state, todolistId, newTodosArray);
      return newState;
    }
    case CHANGE_TODO_TEXT: {
      const { todolistId, todoId, newText } = action;
      const todosArray = state[todolistId];
      const newTodosArray = propChangeHandler(
        todosArray,
        todoId,
        "text",
        newText
      );
      const newState = newStateCreator(state, todolistId, newTodosArray);
      return newState;
    }
    case ADD_TODOLIST: {
      const { id } = action;
      return {
        [id]: [],
        ...state,
      };
    }
    case REMOVE_TODOLIST: {
      const { id } = action;
      return Object.keys(state)
        .filter((key) => key !== id)
        .reduce((acc, key) => {
          return { ...acc, [key]: state[key] };
        }, {});
    }
    default:
      return state;
  }
};

export const addTodoAC = (
  todolistId: string,
  todoText: string
): AddTodoActionType => {
  return {
    type: ADD_TODO,
    todolistId,
    todoText,
  };
};

export const changeTodoStatusAC = (
  todolistId: string,
  todoId: string,
  newStatus: boolean
): ChangeTodoStatusActionType => {
  return {
    type: CHANGE_TODO_STATUS,
    todolistId,
    todoId,
    newStatus,
  };
};

export const removeTodoAC = (
  todolistId: string,
  todoId: string
): RemoveTodoActionType => {
  return {
    type: REMOVE_TODO,
    todolistId,
    todoId,
  };
};

export const changeTodoTextAC = (
  todolistId: string,
  todoId: string,
  newText: string
): ChangeTodoTextActionType => {
  return {
    type: CHANGE_TODO_TEXT,
    todolistId,
    todoId,
    newText,
  };
};
