const koa = require("koa");
const Logger = require("koa-logger");
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./api/routes/userRoute')
const todoRouter = require('./api/routes/todoRoute')

const app = new koa();

app.use(bodyParser());

app.use(cors());

app.use(Logger())
   .use(userRouter.routes())
   .use(userRouter.allowedMethods())
   .use(todoRouter.routes())
   .use(todoRouter.allowedMethods());


app.use(async (ctx, next) => {
   try {
       await next();
   } catch (err) {
       console.error(err);
       ctx.body = "Ops, something wrong happened:<br>" + err.message;
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`running on port ${PORT}`));