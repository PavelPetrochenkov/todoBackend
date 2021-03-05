import db from "../../database";

const dbCollection = "todos";

const find = async (opts: any = {}) => {
  const res = await db(dbCollection)
    .select("*")
    .where("userid", opts.userId)
    .orderBy("id", "asc");
  return res;
};

const findOne = async (opts) => {
  const res = await db(dbCollection).select("*").where("id", opts.id);
  return res[0];
};

const insertOne = async (opts) => {
  const res = await db(dbCollection)
    .insert({ userid: opts.userId, text: opts.text, ischeck: opts.check })
    .returning("*");
  return res[0];
};

const findOneAndDelete = async (opts) => {
  const res = await db(dbCollection).del().where({ id: opts.id });
  return await res;
};

const findOneAndUpdate = async ({ id, userId, ...opts }) => {
  return await db(dbCollection)
    .update({ ...opts })
    .where({ id });
};

const updateMany = async (opts) => {
  return await db(dbCollection)
    .update({ ischeck: !opts.check })
    .where({ userid: opts.userId });
};

const deleteMany = async (opts) => {
  const res = await db(dbCollection)
    .del()
    .where({ userid: opts.userId, ischeck: opts.check });
  return await res;
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
