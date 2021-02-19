import { Context } from "koa";
import todosCollection from "../../../models/todosModels";

export const getTodos = async (ctx: Context) => {
  const todos = await todosCollection.find();
  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};

export const checkAllTodos = async (ctx: Context) => {
  const { check } = ctx.request.body;
  await todosCollection.updateMany({ check });
  const todos = await todosCollection.find();
  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};

export const deleteCompletedTodos = async (ctx: Context) => {
  await todosCollection.deleteMany({ check: true });
  const todos = await todosCollection.find();
  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todos,
  };
};
