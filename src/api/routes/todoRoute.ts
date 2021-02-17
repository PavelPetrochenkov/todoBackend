import Router = require("koa-router");

var router = require("koa-router");

var todoRouter:Router = router();

todoRouter.get("/getAllTodos", (ctx) => {
  ctx.body = "getAllTodos";
});

module.exports = todoRouter;
