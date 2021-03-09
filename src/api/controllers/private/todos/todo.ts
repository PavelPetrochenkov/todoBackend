import { Context } from "koa";
import todosCollection from "../../../models/todosModels";
import { getSocket } from "../../../../server";

export const addTodo = async (ctx: Context) => {
  try {
    const { text, userId, socketId } = ctx.request.body;

    if (!text.length) {
      ctx.response.status = 400;
      ctx.body = {
        reason: "INVALID_TEXT",
        message: "Text cant be empty",
      };
    } else {
      const todo = await todosCollection.insertOne({
        text,
        userid: userId,
        ischeck: false,
      });

      getSocket(socketId)
        .broadcast.to("Socket:" + userId)
        .emit("addTodo", todo);

      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        todo: todo,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (ctx: Context) => {
  try {
    const { id, userId, socketId } = ctx.request.body;

    await todosCollection.findOneAndDelete({
      id,
    });

    getSocket(socketId)
      .broadcast.to("Socket:" + userId)
      .emit("deleteTodo", id);

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      id,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = async (ctx: Context) => {
  try {
    const { id, userId, socketId, ...opts } = ctx.request.body;

    if (!opts.hasOwnProperty("text") && !opts.hasOwnProperty("ischeck")) {
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
      id,
      ...opts,
    });

    const todo = await todosCollection.findOne({ id });

    getSocket(socketId)
      .broadcast.to("Socket:" + userId)
      .emit("changeTextTodo", todo);

    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todo: todo,
    };
  } catch (err) {
    console.log(err);
  }
};
