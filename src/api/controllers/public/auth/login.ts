import { Context } from "koa";
import userCollection from "../../../models/userModels";
import refreshTokensCollection from "../../../models/refreshTokensModels";
import { createToken, createRefreshToken } from "../../../../jwt/jwt";

const login = async (ctx: Context) => {
  try {
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
      const token = createToken(user.id);
      const refreshToken = createRefreshToken(user.id);

      await refreshTokensCollection.updateOne({
        id: user.id,
        refreshToken,
      });

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        id: user.id,
        login: user.login,
        token,
        refreshToken,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export default login;
