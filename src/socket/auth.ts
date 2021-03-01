import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode";
import { verifyToken, createToken, createRefreshToken } from "../jwt/jwt";
import refreshTokensCollection from "../api/models/refreshTokensModels";

export const checkAuth = async (
  token: string,
  refreshToken: string,
  socket: any,
  func: () => void
) => {
  const isAuth = await checkToken(token, refreshToken);

  if (isAuth.error) {
    await socket.emit("clearAuth");
    socket.disconnect();
    return;
  }

  await func();

  if (!isAuth.verify) {
    socket.emit("refreshToken", {
      token: isAuth.token,
      refreshToken: isAuth.refreshToken,
    });
  }
};

const checkToken = async (token: string, refreshToken: string) => {
  try {
    await verifyToken(token);
    return { verify: true, error: false, token: "", refreshToken: "" };
  } catch (err) {
    const res = await checkRefreshToken(refreshToken);
    return res;
  }
};

const checkRefreshToken = async (refreshToken: string) => {
  try {
    const decodedToken: { id: string } = await jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      _id: ObjectId(decodedToken.id),
    });

    if (!!res && res.refreshToken !== refreshToken) {
      return { error: true };
    }
    verifyToken(refreshToken);
    const newToken = createToken(decodedToken.id);
    const newRefreshToken = createRefreshToken(decodedToken.id);
    await refreshTokensCollection.updateOne({
      _id: ObjectId(decodedToken.id),
      refreshToken: newRefreshToken,
    });

    return {
      verify: false,
      error: false,
      token: newToken,
      refreshToken: newRefreshToken,
    };
  } catch (err) {
    return {
      error: true,
    };
  }
};
