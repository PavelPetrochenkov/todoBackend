import { Context } from "koa";
import UsersCollection from "../../../models/userModels";

const registration = async (ctx: Context) => {
  const { login, password } = ctx.request.body;

  const user = await UsersCollection.findOne({ login });

  if (user) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_USER_REGISTRATION",
      message: "Email is already registered",
    };
    return;
  } else {
    await UsersCollection.insertOne({
      login,
      password,
    });
    ctx.response.status = 201;
    ctx.body = {
      message: "Ok",
    };
  }
};

export default registration;
