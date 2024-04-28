import ClearIcon from "@mui/icons-material/Close";
import { Box, Paper } from "@mui/material";
import { memo, useCallback } from "react";
import { Todos } from "./Todos";
import { FilterButtonsGroup } from "./FilterButtonsGroup";
import { TextManager } from "./reusable/TextManager";
import { TodolistType } from "../context/AppContext";
import { useTodolistsStateUpdater } from "../redux/reducers/todolists/todolists-dispatch-hook";
import { FilterParamsType } from "../redux/reducers/todolists/todolists-slice";
import { useTodosStateUpdater } from "../redux/reducers/todos/todos-dispatch-hook";
import { AddItemForm } from "./reusable/AddItemForm";

type TodolistPropsType = {
  todolist: TodolistType;
};

export const Todolist = memo(
  ({ todolist: { id: todolistId, filterParam, title } }: TodolistPropsType) => {
    const {
      changeTodolistFilterHandler,
      changeTodolistTitleHandler,
      removeTodolistHandler,
    } = useTodolistsStateUpdater();

    const { addTodoHandler } = useTodosStateUpdater();

    const addTodo = useCallback(
      (newTodoText: string) => addTodoHandler(todolistId, newTodoText),
      [addTodoHandler, todolistId]
    );

    const addNewTitle = useCallback(
      (newTitle: string) => changeTodolistTitleHandler(todolistId, newTitle),
      [changeTodolistTitleHandler, todolistId]
    );

    const onRemovingTodolist = useCallback(() => {
      removeTodolistHandler(todolistId);
    }, [removeTodolistHandler, todolistId]);

    const addNewFilterParam = useCallback(
      (newFilterParam: FilterParamsType) =>
        changeTodolistFilterHandler(todolistId, newFilterParam),
      [changeTodolistFilterHandler, todolistId]
    );

    return (
      <Paper
        elevation={3}
        sx={{
          width: "300px",
          padding: "15px 20px",
          borderRadius: "20px",
        }}
      >
        <Box
          component={"div"}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ClearIcon
            color="action"
            sx={{ cursor: "pointer" }}
            onClick={onRemovingTodolist}
          />
        </Box>
        <Box
          component={"div"}
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <TextManager text={title} editText={addNewTitle} variant={"h5"} />
        </Box>
        <AddItemForm addItem={addTodo} inputLabel="todo..." />
        <Todos todolistId={todolistId} filterParam={filterParam} />
        <FilterButtonsGroup
          filterParam={filterParam}
          changeFilterParam={addNewFilterParam}
        />
      </Paper>
    );
  }
);
