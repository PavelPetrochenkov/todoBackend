import Router from "koa-router";
import todos from "./todos";
import files from "./files";
import jwt from "koa-jwt";

export default function configPrivateRouter() {
  const router: Router = new Router();

  // router.use(function (ctx, next) {
  //   return next().catch((err) => {
  //     if (401 == err.status) {
  //       ctx.status = 403;
  //       ctx.body =
  //         "Protected resource, use Authorization header to get access\n";
  //     } else {
  //       throw err;
  //     }
  //   });
  // });

  // router.use(jwt({ secret: "my_secret_key" }));

  router.use(...todos());
  router.use(...files());

  return router.routes();
}
