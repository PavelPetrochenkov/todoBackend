import db from "../../database";

const dbCollection = "refreshtokens";

const updateOne = async (opts) => {
  return await db(dbCollection)
    .insert({
      userid: opts.id,
      refreshtoken: opts.refreshToken,
    })
    .onConflict("userid")
    .merge({
      refreshtoken: opts.refreshToken,
    })
    .returning("*");
};

const findOne = async (opts) => {
  const res = await db(dbCollection).select("*").where("userid", opts.id);
  return res[0];
};

export default {
  findOne,
  updateOne,
};
