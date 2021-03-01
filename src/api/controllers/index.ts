import Router from "koa-router";
import configPublicRouter from "./public";

export default function configAllRouter() {
  const router: Router = new Router({ prefix: "/api" });

  router.use(configPublicRouter());

  return router.routes();
}
