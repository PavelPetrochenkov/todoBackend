import { ObjectId } from "mongodb";
import todosCollection from "../api/models/todosModels";

export const getTodos = async (userId:string) => {
  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  return todos
};

export const addTodo = async (text:string, userId:string) => {
  const { ops: todo } = await todosCollection.insertOne({
    text,
    userId: ObjectId(userId),
    check: false,
  });
  return todo[0];
};

export const deleteTodo = async (id) => {
  await todosCollection.findOneAndDelete({
    _id: ObjectId(id),
  });
};

export const updateTodo = async (data) => {
  
  const { id, userId, ...opts } = data;

  if (!opts.hasOwnProperty("text") && !opts.hasOwnProperty("check")) {
    return;
  }

  if (opts.hasOwnProperty("check") && typeof opts.check !== "boolean") {
    return;
  }

  await todosCollection.findOneAndUpdate({
    _id: ObjectId(id),
    ...opts,
    userId: ObjectId(userId),
  });

  const todo = await todosCollection.findOne({ _id: ObjectId(id) });

  return todo;
};

export const checkAllTodos = async (data:any) => {
  
  const {  userId, check } = data;

  await todosCollection.updateMany({ check:!check, userId: ObjectId(userId) });

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  return todos;
};


export const deleteCompletedTodos = async (userId:string) => {
  await todosCollection.deleteMany({ check: true, userId: ObjectId(userId) });

  const todos = await todosCollection.find({ userId: ObjectId(userId) });

  return todos
};
