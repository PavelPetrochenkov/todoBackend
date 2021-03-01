import Router from "koa-router";
import auth from "./auth";

export default function configPublicRouter() {
  const router: Router = new Router();

  router.use(...auth());

  return router.routes();
}
