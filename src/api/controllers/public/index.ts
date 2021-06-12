import Router from "koa-router";
import auth from "./auth";
import tesseract from "./tesseract";

export default function configPublicRouter() {
  const router: Router = new Router();

  router.use(...auth());
  router.use(...tesseract());

  return router.routes();
}
