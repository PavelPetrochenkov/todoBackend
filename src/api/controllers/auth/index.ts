import Router from "koa-router";
import login from "./login";

var authRouter: Router = new Router();

authRouter.post("/login", login);

export default authRouter;
