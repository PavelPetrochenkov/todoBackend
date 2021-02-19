import Router from "koa-router";
import { getTodos, checkAllTodos, deleteCompletedTodos } from "./listTodos";
import { addTodo, deleteTodo, updateTodo } from "./todo";

export default function a() {
  let todosRouter: Router = new Router();

  todosRouter.get("/todo/all", getTodos);

  todosRouter.patch("/todo/all", checkAllTodos);

  todosRouter.delete("/todo/all", deleteCompletedTodos);

  todosRouter.post("/todo", addTodo);

  todosRouter.patch("/todo", updateTodo);

  todosRouter.delete("/todo", deleteTodo);

  return [todosRouter.routes(), todosRouter.allowedMethods()];
}
