const koa = require("koa");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const server = new koa(app);

server.listen(port);
