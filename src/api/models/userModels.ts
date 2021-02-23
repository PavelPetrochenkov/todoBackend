import db from "../../database";

const dbCollection = "users";

const findOne = (opts) => {
  return db.client.collection(dbCollection).findOne(opts);
};

const insertOne = (opts) => {
  return db.client.collection(dbCollection).insertOne(opts);
};

const findOneAndUpdate = ({ _id, ...opts }) => {
  return db.client
    .collection(dbCollection)
    .findOneAndUpdate({ _id }, { $set: opts });
};

export default {
  findOne,
  insertOne,
  findOneAndUpdate,
};
