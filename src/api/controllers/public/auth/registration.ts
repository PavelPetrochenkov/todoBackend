import { Context } from "koa";
import UsersCoollection from "../../../models/userModels";

const registration = async (ctx: Context) => {
  const userLogin = ctx.request.body.login;

  const user = await UsersCoollection.findOne({ login: userLogin });

  if (user) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
    return;
  } else {
    await addUser(userLogin, ctx.request.body.password);
    ctx.response.status = 201;
    ctx.body = {
      message: "User was created",
    };
  }
};

export default registration;
