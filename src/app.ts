import koa, { Context } from "koa";
import Logger from "koa-logger";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import authRouter from "./api/controllers/auth";
import todosRouter from "./api/controllers/todos";

const app = new koa();

app.use(bodyParser());

app.use(cors());

app.use(Logger());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

app.use(todosRouter.routes());
app.use(todosRouter.allowedMethods());

app.use(async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.body = "Ops, something wrong happened:<br>" + err.message;
  }
});

export default app;
