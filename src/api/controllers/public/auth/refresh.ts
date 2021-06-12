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
    const { refreshToken } = ctx.request.body as any;
    const decoded: { id: string } = jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      userid: decoded.id,
    });
    if (!res || res.refreshToken !== refreshToken) {
      ctx.status = 401;
      return;
    }
    verifyToken(refreshToken);
    const newToken = createToken(decoded.id);
    const newRefreshToken = createRefreshToken(decoded.id);

    await refreshTokensCollection.updateOne({
      userid: decoded.id,
      refreshtoken: newRefreshToken,
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
