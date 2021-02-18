import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

type DB = {
  client?: any;
};

let db: DB = {};

const dbName = "todoDB";

(async () => {
  await MongoClient.connect(url, function (err, database) {
    if (err) throw err;
    db.client = database.db(dbName);
  });
})();

export default db;
