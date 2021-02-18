import { Context } from "koa";
import { addUser, usersList } from "../models/Todos";

exports.userLogin = (ctx: Context): void => {
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

exports.userRegistration = (ctx: Context): void => {
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
