import db from "../../database";

const dbCollection = "refreshtokens";

const updateOne = (opts: { userid: string; refreshtoken: string }) => {
  return db(dbCollection)
    .insert(opts)
    .onConflict("userid")
    .merge({
      refreshtoken: opts.refreshtoken,
    })
    .returning("*");
};

const findOne = async (opts: { userid: string }) => {
  const res = await db(dbCollection).select("*").where(opts);
  return res[0];
};

export default {
  findOne,
  updateOne,
};
