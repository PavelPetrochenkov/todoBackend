import { ObjectId } from "mongodb";
import Router from "koa-router";
import todos from "./todos";
import userCollection from "../../models/userModels";

export default function configPrivateRouter() {
  const router: Router = new Router();

  router.use(async (ctx, next) => {
    const { userId } = ctx.request.body;
    const user = await userCollection.findOne({ _id: ObjectId(userId) });

    if (!user) {
      ctx.response.status = 400;
      ctx.body = {
        reason: "INVALID_USER_ID",
        message: "User ID wrong",
      };
      return;
    } else {
      await next();
    }
  });

  router.use(...todos());

  return router.routes();
}
