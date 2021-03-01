import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

type DB = {
  client?: any;
};

let db: DB = {};

const dbName = "todoDB";

export const loadDB = async () => {
  await MongoClient.connect(
    url,
    { useUnifiedTopology: true },
    function (err, client) {
      if (err) throw err;
      db.client = client.db(dbName);
    }
  );
};

export default db;
