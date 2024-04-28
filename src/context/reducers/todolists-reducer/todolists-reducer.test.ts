import { expect, test } from "vitest";
import { FilterParamsType, TodolistType } from "../../../App";
import { v1 } from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterParamAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./todolists-reducer";

test("one todolist should be added to array and to todos object", () => {
  const title = "hello";
  const todolistId = v1();
  const startState: TodolistType[] = [
    { id: v1(), title: "hehe", filterParam: "active" },
  ];

  const newState = todolistsReducer(
    startState,
    addTodolistAC(title, todolistId)
  );

  expect(newState.length).toBe(2);
});

test("todolist's filterParam should be changed properly", () => {
  const newFilterParam: FilterParamsType = "done";
  const todolistId = v1();
  const startState: TodolistType[] = [
    { id: v1(), title: "hehe", filterParam: "active" },
    { id: todolistId, title: "hedas", filterParam: "all" },
  ];

  const newState = todolistsReducer(
    startState,
    changeTodolistFilterParamAC(todolistId, newFilterParam)
  );

  expect(newState[1].filterParam).toBe("done");
});

test("todolist's title should be changed properly", () => {
  const newTitle = "hello";
  const todolistId = v1();
  const startState: TodolistType[] = [
    { id: v1(), title: "hehe", filterParam: "active" },
    { id: todolistId, title: "hedas", filterParam: "all" },
  ];

  const newState = todolistsReducer(
    startState,
    changeTodolistTitleAC(todolistId, newTitle)
  );

  expect(newState[1].title).toBe(newTitle);
});

test("one todolist should be removed correctly", () => {
  const todolistId = v1();
  const startState: TodolistType[] = [
    { id: v1(), title: "hehe", filterParam: "active" },
    { id: todolistId, title: "hedas", filterParam: "all" },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId));

  expect(endState.length).toBe(1);
  expect(endState[0].title).toBe("hehe");
  expect(endState[0].filterParam).toBe("active");
});
