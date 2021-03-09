import db from "../../database";

const dbCollection = "todos";

const find = (opts: { userid: string }) => {
  return db(dbCollection).select("*").where(opts).orderBy("id", "asc");
};

const findOne = async (opts: { id: string }) => {
  const res = await db(dbCollection).select("*").where(opts);
  return res[0];
};

const insertOne = async (opts: {
  userid: string;
  text: string;
  ischeck: boolean;
}) => {
  const res = await db(dbCollection).insert(opts).returning("*");
  return res[0];
};

const findOneAndDelete = (opts: { id: string }) => {
  return db(dbCollection).del().where(opts);
};

const findOneAndUpdate = ({
  id,
  ...opts
}: {
  id: string;
  text?: string;
  ischeck?: string;
}) => {
  return db(dbCollection).update(opts).where({ id });
};

const updateMany = ({
  ischeck,
  ...opts
}: {
  ischeck: boolean;
  userid: string;
}) => {
  return db(dbCollection).update({ ischeck }).where(opts);
};

const deleteMany = (opts) => {
  return db(dbCollection).del().where(opts);
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
