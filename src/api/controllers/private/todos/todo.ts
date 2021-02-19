import { Context } from "koa";
import todosCollection from "../../../models/todosModels";
import { ObjectId } from "mongodb";

export const addTodo = async (ctx: Context) => {
  const { text } = ctx.request.body;
  if (!text.length) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_TEXT",
      message: "Text cant be empty",
    };
  } else {
    const { ops: todo } = await todosCollection.insertOne({
      text,
      check: false,
    });
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      todo: todo,
    };
  }
};

export const deleteTodo = async (ctx: Context) => {
  const { id } = ctx.request.body;
  const { value: deletedTodo } = await todosCollection.findOneAndDelete({
    _id: ObjectId(id),
  });
  if (!deletedTodo) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_ID",
      message: "Id not valid",
    };
    return;
  } else {
    ctx.response.status = 200;
    ctx.body = {
      message: "Ok",
      id,
    };
  }
};

export const updateTodo = async (ctx: Context) => {
  const { id, ...opts } = ctx.request.body;
  if (typeof opts.check === "undefined" && typeof opts.text === "undefined") {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_REQUEST",
      message: "Request doesn't have text or check",
    };
    return;
  } else if (
    typeof opts.check !== "undefined" &&
    typeof opts.check !== "boolean"
  ) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_CHECK",
      message: "Check must be boolean type",
    };
    return;
  } else if (
    typeof opts.text !== "undefined" &&
    !(typeof opts.text === "string" && opts.text)
  ) {
    ctx.response.status = 400;
    ctx.body = {
      reason: "INVALID_DATA",
      message: "Text not valid",
    };
    return;
  } else {
    const { value: updatedTodo } = await todosCollection.findOneAndUpdate({
      _id: ObjectId(id),
      ...opts,
    });
    if (!updatedTodo) {
      ctx.response.status = 400;
      ctx.body = {
        reason: "INVALID_ID",
        message: "Id not valid",
      };
      return;
    } else {
      const todos = await todosCollection.find();
      ctx.response.status = 200;
      ctx.body = {
        message: "Ok",
        todos: todos,
      };
      return;
    }
  }
};
