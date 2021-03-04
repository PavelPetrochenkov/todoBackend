import { Context } from "koa";
import UsersCollection from "../../../models/userModels";
import { createToken, createRefreshToken } from "../../../../jwt/jwt";
import refreshTokensCollection from "../../../models/refreshTokensModels";

const registration = async (ctx: Context) => {
  const { login, password } = ctx.request.body;
  const user = await UsersCollection.findOne({ login });

  if (user !== undefined) {
    ctx.response.status = 401;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
    return;
  } else {
    const todo = await UsersCollection.insertOne({
      login,
      password,
    });

    const token = createToken(todo.id);
    const refreshToken = createRefreshToken(todo.id);

    await refreshTokensCollection.updateOne({
      id: todo.id,
      refreshToken,
    });

    ctx.response.status = 201;
    ctx.body = {
      id: todo.id,
      login: todo.login,
      token,
      refreshToken,
    };
  }
};

export default registration;
