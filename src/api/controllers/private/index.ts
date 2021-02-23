import Router from "koa-router";
import todos from "./todos";
import { verifyToken } from "../../../jwt/jwt";

export default function configPrivateRouter() {
  const router: Router = new Router();

  router.use(async (ctx, next) => {
    const token = ctx.request.header.authorization.split(" ")[1];
    try {
      verifyToken(token);
      await next();
    } catch {
      ctx.status = 401;
      ctx.body = {
        reason: "INVALID_TOKEN",
      };
    }
  });

  router.use(...todos());

  return router.routes();
}
