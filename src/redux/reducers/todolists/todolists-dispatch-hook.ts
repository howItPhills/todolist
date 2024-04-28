import { useDispatch } from "react-redux";
import {
  FilterParamsType,
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
} from "./todolists-slice";
import { v1 } from "uuid";
import { addTodosArray, removeTodosArray } from "../todos/todos-slice";

export const useTodolistsStateUpdater = () => {
  const dispatch = useDispatch();

  const addTodolistHandler = (title: string) => {
    const todolistId = v1();
    dispatch(addTodolist({ id: todolistId, title }));
    dispatch(addTodosArray({ todolistId }));
  };

  const changeTodolistFilterHandler = (
    id: string,
    newFilterParam: FilterParamsType
  ) => {
    dispatch(changeTodolistFilter({ id, newFilterParam }));
  };

  const changeTodolistTitleHandler = (id: string, newTitle: string) => {
    dispatch(changeTodolistTitle({ id, newTitle }));
  };

  const removeTodolistHandler = (id: string) => {
    dispatch(removeTodolist({ id }));
    dispatch(removeTodosArray({ todolistId: id }));
  };

  return {
    addTodolistHandler,
    changeTodolistFilterHandler,
    changeTodolistTitleHandler,
    removeTodolistHandler,
  };
};
