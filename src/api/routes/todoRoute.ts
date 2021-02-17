var router = require("koa-router");

var todoRouter = router();

todoRouter.get("/getAllTodos", (ctx) => {
  ctx.body = "getAllTodos";
});

module.exports = todoRouter;
