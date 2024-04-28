import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Paper, Typography } from "@mui/material";
import { memo, useCallback, useState } from "react";
import { AddItemForm } from "./reusable/AddItemForm";

type TodolistCreatorPropsType = {
  addTodolist: (title: string) => void;
};

export const TodolistCreator = memo(
  ({ addTodolist }: TodolistCreatorPropsType) => {
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const createNewTodolist = useCallback(
      (title: string) => {
        addTodolist(title);
        setIsAdding(false);
      },
      [addTodolist]
    );

    const onAddTodolistClickHandler = useCallback(() => setIsAdding(true), []);

    return (
      <>
        <Paper
          elevation={3}
          sx={{
            width: "15%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            padding: "10px 5px",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" color={"GrayText"}>
            Add todolist
          </Typography>
          <AddCircleIcon
            color="secondary"
            fontSize="large"
            onClick={onAddTodolistClickHandler}
            sx={{ cursor: "pointer" }}
          />
        </Paper>
        {isAdding && (
          <Paper
            elevation={3}
            sx={{
              width: "18%",
              margin: "0 auto",
              marginBottom: "15px",
              padding: "15px",
              textAlign: "center",
              borderRadius: "15px",
            }}
          >
            <AddItemForm
              addItem={createNewTodolist}
              inputLabel="type a title..."
            />
          </Paper>
        )}
      </>
    );
  }
);
