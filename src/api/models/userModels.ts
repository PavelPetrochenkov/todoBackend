import db from "../../database";

const dbCollection = "users";

const findOne = async (opts) => {
  const res = await db
    .select("*")
    .from(dbCollection)
    .where("login", opts.login);
  return res[0];
};

const findOneById = async (opts) => {
  const res = await await db
    .select("*")
    .from(dbCollection)
    .where("id", opts.id);
  return res[0];
};

const insertOne = async (opts) => {
  const res = await db
    .insert({ login: opts.login, password: opts.password })
    .into(dbCollection)
    .returning("*");
  return res[0];
};

export default {
  findOne,
  insertOne,
  findOneById,
};
