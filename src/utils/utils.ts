import { TodoType, TodosType } from "../context/AppContext";

export const newStateCreator = (
  state: TodosType,
  todolistId: string,
  newTodoArray: TodoType[]
) => {
  return {
    ...state,
    [todolistId]: newTodoArray,
  };
};

export const propChangeHandler = <
  T extends { id: string },
  U extends keyof T,
  V extends T[U]
>(
  array: T[],
  id: string,
  prop: U,
  newValue: V
): T[] => {
  return array.map((item) => {
    return item.id === id ? { ...item, [prop]: newValue } : item;
  });
};
