import Router from "koa-router";
import login from "./login";
import refresh from "./refresh";
import registration from "./registration";
import tokenLogin from "./tokenLogin";

export default function a() {
  var authRouter: Router = new Router();

  authRouter.post("/login/token", tokenLogin);

  authRouter.post("/login", login);

  authRouter.post("/registration", registration);

  authRouter.post("/refresh", refresh);

  return [authRouter.routes(), authRouter.allowedMethods()];
}
