import http from "http";
import app from "./app";
import { loadDB } from "./database";
import { initSocket } from "./socket";

const PORT = process.env.PORT || 1382;

loadDB(app);

const server = http.createServer(app.callback());

server.listen(PORT, () =>
  console.log(`running on port http://localhost:${PORT}`)
);

const io = initSocket(server);

export const getSocket = (socketId) => {
  return io.of("/").sockets.get(socketId);
};