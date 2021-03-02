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
      const token = createToken(user._id);
      const refreshToken = createRefreshToken(user._id);

      await refreshTokensCollection.updateOne({
        _id: user._id,
        refreshToken,
      });

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        id: user._id,
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
