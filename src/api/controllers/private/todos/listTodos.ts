import { Context } from "koa";
import { ObjectId } from "mongodb";
import todosCollection from "../../../models/todosModels";
import { getIO } from "../../../../server";

export const getTodos = async (ctx: Context) => {
  const { userId, socketId } = ctx.request.body;

  console.log(ctx.request.body);
  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};

export const checkAllTodos = async (ctx: Context) => {
  const { check, userId, socketId } = ctx.request.body;

  await todosCollection.updateMany({ check, userId: ObjectId(userId) });

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  getIO()
    .broadcast.to("Socket:" + userId)
    .emit("checkAllTodosSuccess", todos);

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};

export const deleteCompletedTodos = async (ctx: Context) => {
  const { userId } = ctx.request.body;

  await todosCollection.deleteMany({ check: true, userId: ObjectId(userId) });

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  getIO()
    .broadcast.to("Socket:" + userId)
    .emit("deleteCompletedTodosSuccess", todos);

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};
