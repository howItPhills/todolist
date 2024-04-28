import { useSelector } from "react-redux";
import { RootStateType } from "../../store/store";
import { TodosType } from "./todos-slice";

export const useTodosMap = () =>
  useSelector<RootStateType, TodosType>((state) => state.todos.todosMap);

export const useTodosArray = (todolistId: string) => {
  const todosState = useTodosMap();
  return todosState[todolistId];
};
