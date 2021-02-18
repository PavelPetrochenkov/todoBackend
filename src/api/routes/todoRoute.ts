import { Context } from "koa";
import Router = require("koa-router");

var router= require("koa-router");

var todoRouter:Router  = router();

todoRouter.get("/getAllTodos", (ctx:Context) => {
  ctx.body = "all todos";
});

module.exports = todoRouter;
