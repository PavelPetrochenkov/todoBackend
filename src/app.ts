import Koa, { Context } from "koa";
import Logger from "koa-logger";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import configAllRouter from "./api/controllers";

const app = new Koa();

app.use(Logger());

app.use(cors());

app.use(bodyParser({
  formLimit: "10mb",
  jsonLimit: "10mb",
  textLimit: "10mb",
  enableTypes: ['json', 'form', 'text']
}));


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
