import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { TodolistType } from "./todolists-slice";

export const useTodolistsArray = () =>
  useSelector<RootStateType, TodolistType[]>(
    (state) => state.todolists.todolistsArray
  );
