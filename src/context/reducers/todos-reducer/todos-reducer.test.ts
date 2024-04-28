import { v1 } from "uuid";
import { expect, test } from "vitest";
import { TodosType } from "../../../App";
import {
  addTodoAC,
  changeTodoStatusAC,
  changeTodoTextAC,
  removeTodoAC,
  todosReducer,
} from "./todos-reducer";
import { addTodolistAC } from "../todolists-reducer/todolists-reducer";

test("one todo should be added correctly", () => {
  const todolistId = v1();
  const todolistId2 = v1();
  const todoText = "hehh";
  const startState: TodosType = {
    [todolistId]: [{ id: v1(), text: "heheh", isDone: false }],
    [todolistId2]: [{ id: v1(), text: "heheh", isDone: false }],
  };

  const endState = todosReducer(startState, addTodoAC(todolistId, todoText));

  expect(endState[todolistId].length).toBe(2);
  expect(endState[todolistId][0].text).toBe(todoText);
  expect(endState[todolistId2].length).toBe(1);
});

test("todo's status should be changed correctly", () => {
  const todolistId = v1();
  const todoId = v1();
  const todolistId2 = v1();
  const newStatus = true;

  const startState: TodosType = {
    [todolistId]: [{ id: todoId, text: "heheh", isDone: false }],
    [todolistId2]: [{ id: v1(), text: "heheh", isDone: false }],
  };

  const endState = todosReducer(
    startState,
    changeTodoStatusAC(todolistId, todoId, newStatus)
  );

  expect(endState[todolistId][0].isDone).toBe(newStatus);
  expect(endState[todolistId2].length).toBe(1);
  expect(endState[todolistId2][0].isDone).toBe(false);
});

test("todo should be removed correctly", () => {
  const todolistId = v1();
  const todoId = v1();
  const todolistId2 = v1();

  const startState: TodosType = {
    [todolistId]: [{ id: todoId, text: "he", isDone: false }],
    [todolistId2]: [{ id: v1(), text: "heheh", isDone: false }],
  };

  const endState = todosReducer(startState, removeTodoAC(todolistId, todoId));

  expect(endState[todolistId].length).toBe(0);
  expect(endState[todolistId2].length).toBe(1);
  expect(endState[todolistId2][0].text).toBe("heheh");
});

test("todo's text should be changed correctly", () => {
  const todolistId = v1();
  const todoId = v1();
  const todolistId2 = v1();
  const newText = "newText";

  const startState: TodosType = {
    [todolistId]: [{ id: todoId, text: "he", isDone: false }],
    [todolistId2]: [{ id: v1(), text: "heheh", isDone: false }],
  };

  const endState = todosReducer(
    startState,
    changeTodoTextAC(todolistId, todoId, newText)
  );

  expect(endState[todolistId].length).toBe(1);
  expect(endState[todolistId][0].text).toBe(newText);
  expect(endState[todolistId2].length).toBe(1);
  expect(endState[todolistId2][0].isDone).toBe(false);
  expect(endState[todolistId][0].isDone).toBe(false);
});

test("todolist should be added to todos objest", () => {
  const todolistId = v1();
  const todolistTitle = "hi";
  const startState: TodosType = {
    [v1()]: [],
  };

  const endState = todosReducer(
    startState,
    addTodolistAC(todolistTitle, todolistId)
  );

  expect(endState[todolistId].length).toBe(0);
});
