import { Context } from "koa";
import { loginUser } from "../../../models/userModels";

const login = async (ctx: Context) => {
  const userLogin = ctx.request.body.login;
  const userPassword = ctx.request.body.password;

  const user = await loginUser(userLogin, userPassword);

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
      id: user._id,
      login: user.login,
      message: "Authorization completed",
    };
  }
};

export default login;
