import db from "../../database";

const dbCollection = "users";

const findOne = async (opts) => {
  const res = await db(dbCollection).select("*").where("login", opts.login);
  return res[0];
};

const findOneById = async (opts) => {
  const res = await await db(dbCollection).select("*").where("id", opts.id);
  return res[0];
};

const insertOne = async (opts) => {
  const res = await db(dbCollection)
    .insert({ login: opts.login, password: opts.password })
    .returning("*");
  return res[0];
};

export default {
  findOne,
  insertOne,
  findOneById,
};
