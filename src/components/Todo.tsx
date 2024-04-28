import { Delete } from "@mui/icons-material";
import { Box, Checkbox, Paper } from "@mui/material";

import { memo, useCallback } from "react";
import { TextManager } from "./reusable/TextManager";

import "../App.scss";
import { TodoType } from "../context/AppContext";

type TodoPropsType = {
  todo: TodoType;
  changeTodoStatus: (todoId: string, newStatus: boolean) => void;
  changeTodoText: (todoId: string, newText: string) => void;
  removeTodo: (todoId: string) => void;
};

export const Todo = memo(
  ({
    todo: { id, isDone, text },
    changeTodoStatus,
    changeTodoText,
    removeTodo,
  }: TodoPropsType) => {
    console.log("todo called");

    const onTodoStatusChange = useCallback(
      () => changeTodoStatus(id, !isDone),
      [changeTodoStatus, isDone, id]
    );

    const onTextChange = useCallback(
      (newText: string) => changeTodoText(id, newText),
      [changeTodoText, id]
    );

    const onRemoveTodo = useCallback(() => removeTodo(id), [removeTodo, id]);

    return (
      <Paper
        elevation={2}
        sx={{
          width: "80%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
          marginTop: "15px",
          padding: "5px 15px",
          borderRadius: "15px",
        }}
        className={`${isDone && "todo-done"} todo-wrapper`}
      >
        <TextManager text={text} editText={onTextChange} variant="body1" />
        <Box
          component={"div"}
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Checkbox
            color="secondary"
            checked={isDone}
            onChange={onTodoStatusChange}
          />
          <Delete
            color="secondary"
            sx={{ cursor: "pointer" }}
            onClick={onRemoveTodo}
          />
        </Box>
      </Paper>
    );
  }
);
