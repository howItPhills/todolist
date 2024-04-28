import { Todo } from "./Todo";
import { memo, useCallback, useMemo } from "react";
import { FilterParamsType } from "../context/AppContext";
import { useTodosArray } from "../redux/reducers/todos/todos-selector-hooks";
import { useTodosStateUpdater } from "../redux/reducers/todos/todos-dispatch-hook";

type TodosPropsType = {
  todolistId: string;
  filterParam: FilterParamsType;
};

export const Todos = memo(({ todolistId, filterParam }: TodosPropsType) => {
  const todosArray = useTodosArray(todolistId);

  const { changeTodoStatusHandler, changeTodoTextHandler, removeTodoHandler } =
    useTodosStateUpdater();

  const filteredTodos = useMemo(() => {
    if (filterParam === "active") {
      return todosArray.filter((todo) => !todo.isDone);
    } else if (filterParam === "done") {
      return todosArray.filter((todo) => todo.isDone);
    } else {
      return todosArray;
    }
  }, [filterParam, todosArray]);

  const addNewTodoStatus = useCallback(
    (todoId: string, newStatus: boolean) =>
      changeTodoStatusHandler(todolistId, todoId, newStatus),
    [changeTodoStatusHandler, todolistId]
  );

  const addNewTodoText = useCallback(
    (todoId: string, newTodoText: string) =>
      changeTodoTextHandler(todolistId, todoId, newTodoText),
    [changeTodoTextHandler, todolistId]
  );

  const onRemovingTodo = useCallback(
    (todoId: string) => removeTodoHandler(todolistId, todoId),
    [removeTodoHandler, todolistId]
  );

  return filteredTodos.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      changeTodoStatus={addNewTodoStatus}
      changeTodoText={addNewTodoText}
      removeTodo={onRemovingTodo}
    />
  ));
});
