import { ObjectId } from "mongodb";
import todosCollection from "../api/models/todosModels";

export const addTodo = async (data) => {
  const { text, userId } = data;
  const { ops: todo } = await todosCollection.insertOne({
    text,
    userId: ObjectId(userId),
    check: false,
  });
  return todo[0];
};

export const deleteTodo = async (data) => {
  const { id } = data;

  await todosCollection.findOneAndDelete({
    _id: ObjectId(id),
  });

  return id;
};

export const updateTodo = async (data) => {
  const { id, ...opts } = data;

  if (!opts.hasOwnProperty("text") && !opts.hasOwnProperty("check")) {
    return;
  }

  if (opts.hasOwnProperty("check") && typeof opts.check !== "boolean") {
    return;
  }

  await todosCollection.findOneAndUpdate({
    _id: ObjectId(id),
    ...opts,
    userId: ObjectId(opts.userId),
  });

  const todo = await todosCollection.findOne({ _id: ObjectId(id) });

  return todo[0];
};
