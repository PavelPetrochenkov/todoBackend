import { Context } from "koa";
import jwt_decode from "jwt-decode";
import {
  createToken,
  createRefreshToken,
  verifyToken,
} from "../../../../jwt/jwt";
import refreshTokensCollection from "../../../models/refreshTokensModels";
import userCollection from "../../../models/userModels";

const getUserInfo = async (ctx: Context) => {
  const { refreshToken } = ctx.request.body;
  try {
    const decodedToken: { id: string } = jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      id: decodedToken.id,
    });

    if (!res || res.refreshtoken !== refreshToken) {
      ctx.status = 401;
      return;
    }
    verifyToken(refreshToken);
    const newToken = createToken(decodedToken.id);
    const newRefreshToken = createRefreshToken(decodedToken.id);

    await refreshTokensCollection.updateOne({
      id: decodedToken.id,
      refreshToken: newRefreshToken,
    });

    const user = await userCollection.findOneById({
      id: decodedToken.id,
    });

    ctx.status = 200;
    ctx.body = {
      id: decodedToken.id,
      login: user.login,
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    ctx.status = 401;
  }
};

export default getUserInfo;
