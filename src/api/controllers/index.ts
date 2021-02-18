import Router from "koa-router";
import configPrivateRouter from "./private";
import configPublicRouter from "./public";

export default function configAllRouter() {
  const router: Router = new Router({ prefix: "/api" });

  router.use(configPublicRouter());
  router.use(configPrivateRouter());

  return router.routes();
}
