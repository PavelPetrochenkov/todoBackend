import { Context } from "koa";
import { addUser, usersList } from "../../models/Todos";

const registration = (ctx: Context): void => {
  const userLogin = ctx.request.body.login;
  const user = usersList.find((user) => user.login === userLogin);
  if (!!user) {
    ctx.response.status = 409;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
  } else {
    addUser({
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
