import { Context } from "koa";
import UsersCollection from "../../../models/userModels";
import { createToken, createRefreshToken } from "../../../../jwt/jwt";
import userCollection from "../../../models/userModels";
import refreshTokensCollection from "../../../models/refreshTokensModels";

const registration = async (ctx: Context) => {
  const { login, password } = ctx.request.body;
  const user = await UsersCollection.findOne({ login });

  if (user !== null) {
    ctx.response.status = 401;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
    return;
  } else {
    const { ops } = await UsersCollection.insertOne({
      login,
      password,
    });

    const token = createToken(ops._id);
    const refreshToken = createRefreshToken(ops._id);

    await refreshTokensCollection.updateOne({
      _id: ops._id,
      refreshToken,
    });

    ctx.response.status = 201;
    ctx.body = {
      id: ops[0]._id,
      login: ops[0].login,
      token,
      refreshToken,
    };
  }
};

export default registration;
