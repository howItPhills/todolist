import { useContext } from "react";
import {
  FilterParamsType,
  TodoType,
  TodolistType,
  TodolistsContextUpdater,
  TodolistsContextUpdaterType,
  TodolistsContextValue,
  TodosType,
} from "../context/AppContext";
import {
  TodosContextUpdater,
  TodosContextUpdaterType,
  TodosContextValue,
} from "../context/AppContext";

export const useTodolistsContextValue = () => {
  return useContext(TodolistsContextValue) as TodolistType[];
};

export const useTodolistsContextUpdater = () => {
  return useContext(TodolistsContextUpdater) as TodolistsContextUpdaterType;
};

export const useTodosContextValue = (
  todolistId: string,
  filterParam: FilterParamsType
): TodoType[] => {
  const todosState = useContext(TodosContextValue) as TodosType;

  const todosArray = todosState[todolistId];

  let filteredTodosArray = todosArray;

  if (filterParam === "active") {
    filteredTodosArray = todosArray.filter((todo) => !todo.isDone);
  } else if (filterParam === "done") {
    filteredTodosArray = todosArray.filter((todo) => todo.isDone);
  }
  return filteredTodosArray;
};

export const useTodosContextUpdater = () => {
  return useContext(TodosContextUpdater) as TodosContextUpdaterType;
};
