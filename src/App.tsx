import { Todolist } from "./components/Todolist";
import { TodolistCreator } from "./components/TodolistCreator";
import { Box } from "@mui/material";

import { useTodolistsArray } from "./redux/reducers/todolists/todolist-selector-hooks";

import "./App.scss";
import { useTodolistsStateUpdater } from "./redux/reducers/todolists/todolists-dispatch-hook";
import { useTodosMap } from "./redux/reducers/todos/todos-selector-hooks";

//COMPONENT
export const App = () => {
  const todolists = useTodolistsArray();
  const { addTodolistHandler } = useTodolistsStateUpdater();

  //UI
  return (
    <>
      <TodolistCreator addTodolist={addTodolistHandler} />
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {todolists.map((todolist) => (
          <Todolist key={todolist.id} todolist={todolist} />
        ))}
      </Box>
    </>
  );
};
