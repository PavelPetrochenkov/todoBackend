import { Context } from "koa";

const registration = async (ctx: Context) => {
  const userLogin = ctx.request.body.login;

  const user = await ctx.mongo
    .db("todoDB")
    .collection("users")
    .findOne({ login: userLogin });

  if (user) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
    return;
  } else {
    await ctx.mongo.db("todoDB").collection("users").insertOne({
      id: Date.now().toString(),
      login: userLogin,
      password: ctx.request.body.password,
    });

    ctx.response.status = 201;
    ctx.body = {
      message: "User was created",
    };
  }
};

export default registration;
