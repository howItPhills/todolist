import { useDispatch } from "react-redux";
import {
  addTodo,
  changeTodoStatus,
  changeTodoText,
  removeTodo,
} from "./todos-slice";

export const useTodosStateUpdater = () => {
  const dispatch = useDispatch();

  const addTodoHandler = (todolistId: string, text: string) => {
    dispatch(addTodo({ todolistId, text }));
  };

  const removeTodoHandler = (todolistId: string, id: string) => {
    dispatch(removeTodo({ todolistId, id }));
  };

  const changeTodoTextHandler = (
    todolistId: string,
    id: string,
    newText: string
  ) => {
    dispatch(changeTodoText({ todolistId, id, newText }));
  };

  const changeTodoStatusHandler = (
    todolistId: string,
    id: string,
    newStatus: boolean
  ) => {
    dispatch(changeTodoStatus({ todolistId, id, newStatus }));
  };

  return {
    addTodoHandler,
    removeTodoHandler,
    changeTodoStatusHandler,
    changeTodoTextHandler,
  };
};
