import { Context } from "koa";
import userCollection from "../../../models/userModels";
import refreshTokensCollection from "../../../models/refreshTokensModels";
import { createToken, createRefreshToken } from "../../../../jwt/jwt";

export const checkLogin = async (ctx: Context) => {
  try {
    const { login } = ctx.request.body as any;
    const user = await userCollection.findOne(login);

    console.log(user);
    console.log(login);

    if (!user) {
      ctx.response.status = 404;
      ctx.body = {
        reason: "INVALID_USER_LOGIN",
        message: "User not found",
      };
      return;
    }

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      login: user.login,
    };
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (ctx: Context) => {
  try {
    const { login, password } = ctx.request.body as any;
    const user = await userCollection.findOne({
      login,
    });

    if (!user) {
      ctx.response.status = 401;
      ctx.body = {
        reason: "INVALID_USER_AUTHENTICATION",
        message: "Failed to authorization",
      };
      return;
    } else {
      // await userCollection.findOneAndUpdate({
      //   login,
      //   password,
      // });

      const token = createToken(user.id);
      const refreshtoken = createRefreshToken(user.id);

      await refreshTokensCollection.updateOne({
        userid: user.id,
        refreshtoken,
      });

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        id: user.id,
        login: user.login,
        token,
        refreshToken: refreshtoken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};
