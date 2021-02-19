import { Context } from "koa";
import userCollection from "../../../models/userModels";

const login = async (ctx: Context) => {
  const { login, password } = ctx.request.body;

  const user = await userCollection.findOne({
    login,
    password,
  });

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
      message: "Ok",
      id: user._id,
      login: user.login,
    };
  }
};

export default login;
