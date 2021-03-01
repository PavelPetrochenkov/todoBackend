import Router from "koa-router";
import { getTodos, checkAllTodos, deleteCompletedTodos } from "./listTodos";
import { addTodo, deleteTodo, updateTodo } from "./todo";

export default function a() {
  let todosRouter: Router = new Router();

  todosRouter.post("/todo/all", getTodos);

  todosRouter.post("/todo/all/check", checkAllTodos);

  todosRouter.post("/todo/all/delete", deleteCompletedTodos);

  todosRouter.post("/todo", addTodo);

  todosRouter.post("/todo/change", updateTodo);

  todosRouter.post("/todo/delete", deleteTodo);

  return [todosRouter.routes(), todosRouter.allowedMethods()];
}
