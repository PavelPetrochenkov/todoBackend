import { Context } from "koa";
import { ObjectId } from "mongodb";
import todosCollection from "../../../models/todosModels";

export const getTodos = async (ctx: Context) => {
  const { userId } = ctx.request.body;

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};

export const checkAllTodos = async (ctx: Context) => {
  const { check, userId } = ctx.request.body;

  await todosCollection.updateMany({ check, userId: ObjectId(userId) });

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

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

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};
