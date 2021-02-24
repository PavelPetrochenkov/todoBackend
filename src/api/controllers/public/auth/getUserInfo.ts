import { Context } from "koa";
import { ObjectId } from "mongodb";
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
    const decoded: { id: string } = jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      _id: ObjectId(decoded.id),
    });

    if (!res && res.refreshToken !== refreshToken) {
      ctx.status = 401;
      return;
    }
    verifyToken(refreshToken);
    const newToken = createToken(decoded.id);
    const newRefreshToken = createRefreshToken(decoded.id);

    await refreshTokensCollection.updateOne({
      _id: ObjectId(decoded.id),
      refreshToken: newRefreshToken,
    });

    const user = await userCollection.findOne({
      _id: ObjectId(decoded.id),
    });
    ctx.status = 200;
    ctx.body = {
      id: decoded.id,
      login: user.login,
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    ctx.status = 401;
  }
};

export default getUserInfo;
