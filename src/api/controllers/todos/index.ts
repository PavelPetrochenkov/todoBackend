import { Context } from "koa";
import Router from "koa-router";

let todosRouter: Router = new Router();

todosRouter.get("/getTodos", (ctx: Context) => {
  ctx.body = "all todo";
});

export default todosRouter;
