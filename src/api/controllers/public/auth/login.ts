import { Context } from "koa";

const login = async (ctx: Context) => {
  const userLogin = ctx.request.body.login;
  const userPassword = ctx.request.body.password;

  const user = await ctx.mongo
    .db("todoDB")
    .collection("users")
    .findOne({ login: userLogin, password: userPassword });

  if (!user) {
    ctx.response.status = 401;
    ctx.body = {
      reason: "INVALID_USER_AUTHENTICATION",
      message: "Failed to authorization",
    };
    return;
  } else {
    ctx.response.status = 200;
    ctx.body = {
      id: user.id,
      login: user.login,
      message: "Authorization completed",
    };
  }
};

export default login;
