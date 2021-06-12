import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import tesseract from "./tesseract";
var koa = require('koa');

export default function a() {
  var authRouter: Router = new Router();

//Set up body parsing middleware
authRouter.use(bodyParser({
  //@ts-ignore
   formidable:{uploadDir: './uploads'},    //This is where the files would come
   multipart: true,
   urlencoded: true
}));

  authRouter.post("/tesseract", tesseract);
  return [authRouter.routes(), authRouter.allowedMethods()];
}
