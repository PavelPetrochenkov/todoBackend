import db from "../../database";

const dbCollection = "users";

const findOne = async (opts: { login: string }) => {
  const res = await db(dbCollection).select("*").where(opts);
  return res[0];
};

const findOneById = async (opts: { id: string }) => {
  const res = await db(dbCollection).select("*").where(opts);
  return res[0];
};

const insertOne = async (opts: { login: string; password: string }) => {
  const res = await db(dbCollection).insert(opts).returning("*");
  return res[0];
};

const findOneAndUpdate = ({
  login,
  ...opts
}: {
  login: string;
  password: string;
}) => {
  return db(dbCollection).update(opts).where({ login });
};

export default {
  findOne,
  insertOne,
  findOneById,
  findOneAndUpdate,
};
