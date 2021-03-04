import db from "../../database";

const dbCollection = "refreshTokens";

const updateOne = async (opts) => {
  // db(dbCollection).upsert(['userid']).insert({userid:opts.id, refreshtoken:opts.refreshToken}).update({refreshtoken:opts.refreshToken})
  return await db.raw(`INSERT INTO ${dbCollection} (userid,refreshtoken)
  VALUES ('${opts.id}','${opts.refreshToken}')
  ON CONFLICT (userid) DO UPDATE
  SET refreshtoken = excluded.refreshtoken;`);
};

const findOne = async (opts) => {
  const res = await db.select("*").from(dbCollection).where("userid", opts.id);
  return res.rows[0];
};

export default {
  findOne,
  updateOne,
};
