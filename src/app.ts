import Koa, { Context } from "koa";
import Logger from "koa-logger";
import cors from "koa-cors";
import bodyParser from "koa-bodyparser";
import configAllRouter from "./api/controllers";

const app = new Koa();

app.use(Logger());

app.use(cors());

app.use(bodyParser());

app.use(configAllRouter());

export default app;
