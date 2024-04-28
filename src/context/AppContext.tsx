import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import {
  addTodolistAC,
  changeTodolistFilterParamAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./reducers/todolists-reducer/todolists-reducer";
import { v1 } from "uuid";
import {
  addTodoAC,
  changeTodoStatusAC,
  changeTodoTextAC,
  removeTodoAC,
  todosReducer,
} from "./reducers/todos-reducer/todos-reducer";

export type FilterParamsType = "all" | "active" | "done";

export type TodolistType = {
  id: string;
  title: string;
  filterParam: FilterParamsType;
};

export type TodoType = {
  id: string;
  text: string;
  isDone: boolean;
};

export type TodosType = {
  [key: string]: TodoType[];
};

export type TodolistsContextUpdaterType = {
  changeTodolistTitle: (todolistId: string, newTitle: string) => void;
  changeTodolistFilterParam: (
    todolistId: string,
    newFilterParam: FilterParamsType
  ) => void;
  addTodolist: (title: string) => void;
  removeTodolist: (id: string) => void;
};

export type TodosContextUpdaterType = {
  changeTodoStatus: (
    todolistId: string,
    todoId: string,
    newStatus: boolean
  ) => void;
  changeTodoText: (todolistId: string, todoId: string, newText: string) => void;
  addTodo: (todolistId: string, todoText: string) => void;
  removeTodo: (todolistId: string, todoId: string) => void;
};

//All CONTEXTS:

//TODOLISTS CONTEXTS
export const TodolistsContextValue = createContext<TodolistType[] | null>(null);
export const TodolistsContextUpdater =
  createContext<TodolistsContextUpdaterType | null>(null);

//TODOS CONTEXTS
export const TodosContextValue = createContext<TodosType | null>(null);
export const TodosContextUpdater =
  createContext<TodosContextUpdaterType | null>(null);

//MAIN CONTEXT PROVIDER
export const AppContextPropvider = ({ children }: PropsWithChildren) => {
  //APP STATE
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, []);
  const [todosState, dispatchToTodos] = useReducer(todosReducer, {});

  //TODOLISTS MANIPULATION FUNCTIONS
  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) =>
      dispatchToTodolists(changeTodolistTitleAC(todolistId, newTitle)),
    []
  );

  const changeTodolistFilterParam = useCallback(
    (todolistId: string, newFilterParam: FilterParamsType) =>
      dispatchToTodolists(
        changeTodolistFilterParamAC(todolistId, newFilterParam)
      ),
    []
  );

  const addTodolist = useCallback((title: string) => {
    const newtodolistId = v1();
    dispatchToTodolists(addTodolistAC(title, newtodolistId));
    dispatchToTodos(addTodolistAC(title, newtodolistId));
  }, []);

  const removeTodolist = useCallback((todolistId: string) => {
    dispatchToTodolists(removeTodolistAC(todolistId));
    dispatchToTodos(removeTodolistAC(todolistId));
  }, []);

  //TODOS MANIPULATION FUNCTIONS
  const changeTodoStatus = useCallback(
    (todolistId: string, todoId: string, newStatus: boolean) =>
      dispatchToTodos(changeTodoStatusAC(todolistId, todoId, newStatus)),
    []
  );

  const changeTodoText = useCallback(
    (todolistId: string, todoId: string, newText: string) =>
      dispatchToTodos(changeTodoTextAC(todolistId, todoId, newText)),
    []
  );

  const addTodo = useCallback(
    (todolistId: string, todoText: string) =>
      dispatchToTodos(addTodoAC(todolistId, todoText)),
    []
  );

  const removeTodo = useCallback((todolistId: string, todoId: string) => {
    dispatchToTodos(removeTodoAC(todolistId, todoId));
  }, []);

  //TODOSUPDATER CONTEXT VALUE
  const todosContextUpdater = useMemo(
    () => ({
      changeTodoStatus,
      changeTodoText,
      addTodo,
      removeTodo,
    }),
    [changeTodoStatus, changeTodoText, addTodo, removeTodo]
  );

  //TODLISTSUPDATER CONTEXT VALUE
  const todolistsContextUpdater = useMemo(
    () => ({
      changeTodolistTitle,
      changeTodolistFilterParam,
      addTodolist,
      removeTodolist,
    }),
    [
      changeTodolistTitle,
      changeTodolistFilterParam,
      addTodolist,
      removeTodolist,
    ]
  );

  return (
    <TodolistsContextValue.Provider value={todolists}>
      <TodolistsContextUpdater.Provider value={todolistsContextUpdater}>
        <TodosContextValue.Provider value={todosState}>
          <TodosContextUpdater.Provider value={todosContextUpdater}>
            {children}
          </TodosContextUpdater.Provider>
        </TodosContextValue.Provider>
      </TodolistsContextUpdater.Provider>
    </TodolistsContextValue.Provider>
  );
};
