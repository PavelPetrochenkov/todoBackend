import { Context } from "koa";
import { usersList } from "../../models/Todos";

const login = (ctx: Context): void => {
  const userLogin = ctx.request.body.login;
  const userPassword = ctx.request.body.password;
  const user = usersList.find((user) => {
    return user.login === userLogin && user.password === userPassword;
  });
  if (!!user) {
    ctx.response.status = 200;
    ctx.body = {
      id: user.id,
      login: user.login,
      message: "Authorization completed",
    };
  } else {
    ctx.response.status = 401;
    ctx.body = {
      reason: "INVALID_USER_AUTHENTICATION",
      message: "Failed to authorization",
    };
  }
};

export default login;
