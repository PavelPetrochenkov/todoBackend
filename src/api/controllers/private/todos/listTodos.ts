import { Context } from "koa";
import todosCollection from "../../../models/todosModels";
import { getSocket } from "../../../../server";

export const getTodos = async (ctx: Context) => {
  try {
    const { userId } = ctx.request.body;

    const todos = await todosCollection.find({ userId });

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const checkAllTodos = async (ctx: Context) => {
  try {
    const { check, userId, socketId } = ctx.request.body;

    await todosCollection.updateMany({ check, userId });

    const todos = await todosCollection.find({ userId });

    getSocket(socketId)
      .broadcast.to("Socket:" + userId)
      .emit("checkAllTodos", todos);

    console.log(todos);
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todos,
    };
  } catch (err) {
    console.log(err);
  }
};

export const deleteCompletedTodos = async (ctx: Context) => {
  try {
    const { userId, socketId } = ctx.request.body;

    await todosCollection.deleteMany({ check: true, userId });

    const todos = await todosCollection.find({ userId });

    getSocket(socketId)
      .broadcast.to("Socket:" + userId)
      .emit("deleteCompletedTodos", todos);

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todos,
    };
  } catch (err) {
    console.log(err);
  }
};
