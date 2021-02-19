import db from "../../database";

const dbCollection = "todos";

const find = (opts = {}) => {
  return db.client.collection(dbCollection).find(opts).toArray();
};

const findOne = (opts) => {
  return db.client.collection(dbCollection).findOne(opts);
};

const insertOne = (opts) => {
  return db.client.collection(dbCollection).insertOne(opts);
};

const findOneAndDelete = (opts) => {
  return db.client.collection(dbCollection).findOneAndDelete(opts);
};

const findOneAndUpdate = ({ _id, ...opts }) => {
  return db.client
    .collection(dbCollection)
    .findOneAndUpdate({ _id }, { $set: opts });
};

const updateMany = (opts) => {
  return db.client.collection(dbCollection).updateMany(opts, {
    $set: { check: !opts.check },
  });
};

const deleteMany = (opts) => {
  return db.client.collection(dbCollection).deleteMany(opts);
};

export default {
  find,
  findOne,
  insertOne,
  findOneAndUpdate,
  findOneAndDelete,
  updateMany,
  deleteMany,
};
