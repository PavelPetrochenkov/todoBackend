import Router from "koa-router";
import todos from "./todos";

export default function configPrivateRouter() {
  const router: Router = new Router();

  router.use(...todos());

  return router.routes();
}
