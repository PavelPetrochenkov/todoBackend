import { ObjectId } from "mongodb";
import { Context } from "koa";
import refreshTokensCollection from "../../../models/refreshTokensModels";
import jwt_decode from "jwt-decode";
import {
  createToken,
  createRefreshToken,
  verifyToken,
} from "../../../../jwt/jwt";

const refresh = async (ctx: Context) => {
  try {
    const { refreshToken } = ctx.request.body;
    const decoded: { id: string } = jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      _id: ObjectId(decoded.id),
    });
    if (!res || res.refreshToken !== refreshToken) {
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

    ctx.status = 200;
    ctx.body = {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    ctx.status = 401;
  }
};

export default refresh;
