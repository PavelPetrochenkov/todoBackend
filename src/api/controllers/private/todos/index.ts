import { Context } from "koa";
import Router from "koa-router";

export default function a() {
  let todosRouter: Router = new Router();

  todosRouter.get("/getTodos", (ctx: Context) => {
    ctx.body = "all todo";
  });

  return [todosRouter.routes(), todosRouter.allowedMethods()];
}
