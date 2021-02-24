import Router from "koa-router";
import login from "./login";
import refresh from "./refresh";
import registration from "./registration";
import getUserInfo from "./getUserInfo";

export default function a() {
  var authRouter: Router = new Router();

  authRouter.post("/user/info", getUserInfo);

  authRouter.post("/login", login);

  authRouter.post("/registration", registration);

  authRouter.post("/refresh", refresh);

  return [authRouter.routes(), authRouter.allowedMethods()];
}
