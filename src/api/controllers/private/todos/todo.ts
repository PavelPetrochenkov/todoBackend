import { Context } from "koa";
import { ObjectId } from "mongodb";
import todosCollection from "../../../models/todosModels";
import { getIO } from "../../../../server";

export const addTodo = async (ctx: Context) => {
  const { text, userId } = ctx.request.body;

  if (!text.length) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_TEXT",
      message: "Text cant be empty",
    };
  } else {
    const { ops: todo } = await todosCollection.insertOne({
      text,
      userId: ObjectId(userId),
      check: false,
    });

    getIO()
      .broadcast.to("Socket:" + userId)
      .emit("addTodoSuccess", todo[0]);

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todo: todo[0],
    };
  }
};

export const deleteTodo = async (ctx: Context) => {
  const { id, userId } = ctx.request.body;

  await todosCollection.findOneAndDelete({
    _id: ObjectId(id),
  });

  getIO()
    .broadcast.to("Socket:" + userId)
    .emit("deleteTodoSuccess", id);

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    id,
  };
};

export const updateTodo = async (ctx: Context) => {
  const { id, userId, ...opts } = ctx.request.body;

  if (!opts.hasOwnProperty("text") && !opts.hasOwnProperty("check")) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_REQUEST",
      message: "Request doesn't have text or check",
    };
    return;
  }

  if (opts.hasOwnProperty("check") && typeof opts.check !== "boolean") {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_CHECK",
      message: "Check must be boolean type",
    };
    return;
  }

  await todosCollection.findOneAndUpdate({
    _id: ObjectId(id),
    ...opts,
    userId: ObjectId(userId),
  });

  const todo = await todosCollection.findOne({ _id: ObjectId(id) });

  getIO()
    .broadcast.to("Socket:" + userId)
    .emit("changeTextTodoSuccess", todo);

  ctx.response.status = 200;
  ctx.body = {
    message: "Ok",
    todo: todo,
  };
};
