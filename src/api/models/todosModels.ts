import db from "../../database";

const dbCollection = "todos";

const find = async (opts: any = {}) => {
  const res = await db
    .select("*")
    .from(dbCollection)
    .where("userid", opts.userId)
    .orderBy("id", "asc");
  return res;
};

const findOne = async (opts) => {
  const res = await db.select("*").from(dbCollection).where("id", opts.id);
  return res[0];
};

const insertOne = async (opts) => {
  const res = await db
    .insert({ userid: opts.userid, text: opts.text, ischeck: opts.check })
    .into(dbCollection)
    .returning("*");

  return res[0];
};

const findOneAndDelete = async (opts) => {
  const res = await db.del().from(dbCollection).where({ id: opts.id });
  return await res;
};

const findOneAndUpdate = async ({ id, userId, ...opts }) => {
  return await db(dbCollection)
    .update({ ...opts })
    .where({ id });
};

const updateMany = async (opts) => {
  return await db.query(
    `UPDATE ${dbCollection} SET ischeck = '${!opts.check}' WHERE userid = '${
      opts.userId
    }';`
  );
};

const deleteMany = async (opts) => {
  const res = await db
    .del()
    .from(dbCollection)
    .where({ userId: opts.userId, ischeck: opts.check });
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
