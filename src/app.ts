import koa, { Context } from "koa";
import Logger from "koa-logger";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import configAllRouter from "./api/controllers";
import Mongo from "koa-mongo";

const app = new koa();

app.use(bodyParser());

app.use(cors());

app.use(Logger());

app.use(Mongo());

app.use(configAllRouter());

app.use(async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.body = "Ops, something wrong happened:<br>" + err.message;
  }
});

export default app;
