import Router = require("koa-router");

var router = require("koa-router");
const { userLogin } = require("../controllers/userController");

var userRouter:Router = router();

userRouter.post("/login", userLogin);

module.exports = userRouter;
