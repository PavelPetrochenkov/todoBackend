import db from "../../database";

const dbCollection = "users";

export const findOne = (opts) => {
  return db.client.collection(dbCollection).findOne(opts);
};

export const addUser = (login, password) => {
  return db.client.collection(dbCollection).insertOne({
    login,
    password,
  });
};

export const loginUser = (login, password) => {
  return db.client.collection(dbCollection).findOne({ login, password });
};

export default {
  findOne,
  insertOne,
};
