const koa = require("koa");
const app = require("./app");

const server = app;

const PORT = process.env.PORT || 1328;

server.listen(PORT, () =>
  console.log(`running on port http://localhost:${PORT}`)
);
