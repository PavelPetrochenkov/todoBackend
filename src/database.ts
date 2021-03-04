const knex = require("knex");

const dbName = "todoDB";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "123123",
    database: dbName,
  },
});

export const loadDB = async (app) => {
  app.pool = db;
};

export default db;
