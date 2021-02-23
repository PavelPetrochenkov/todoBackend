import { Context } from "koa";
import jwt_decode from "jwt-decode";
import {
  createToken,
  createRefreshToken,
  verifyToken,
} from "../../../../jwt/jwt";

const refresh = async (ctx: Context) => {
  const { refreshToken } = ctx.request.body;
  try {
    verifyToken(refreshToken);
    const decoded: any = jwt_decode(refreshToken);
    const newToken = createToken(decoded.id);
    const newRefreshToken = createRefreshToken(decoded.id);
    ctx.status = 200;
    ctx.body = {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    ctx.status = 401;
    ctx.body = {
      reason: "INVALID_RETOKEN",
    };
  }
};

export default refresh;
