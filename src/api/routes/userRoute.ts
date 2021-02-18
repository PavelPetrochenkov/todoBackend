import Router = require("koa-router");
var router = require("koa-router");
const {
  userLogin,
  userRegistration,
} = require("../controllers/userController");

var userRouter: Router = router();

userRouter.post("/login", userLogin);
userRouter.post("/register", userRegistration);

module.exports = userRouter;
