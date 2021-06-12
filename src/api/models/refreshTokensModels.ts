import db from "../../database";

const dbCollection = "refreshtokens";


const updateOne = (opts) => {
  return db.client
    .collection(dbCollection)
    .updateOne({ _id: opts._id }, { $set: opts }, { upsert: true });
};

const findOne = (opts) => {
  return db.client.collection(dbCollection).findOne(opts);
};

export default {
  findOne,
  updateOne,
};
