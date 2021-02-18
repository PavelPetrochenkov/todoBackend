import Router from "koa-router";
import login from "./login";
import registration from "./registration";

export default function a() {
  var authRouter: Router = new Router();

  authRouter.post("/login", login);

  authRouter.post("/registration", registration);

  return [authRouter.routes(), authRouter.allowedMethods()];
}
