import app from "./app";
import http from "http";
import { loadDB } from "./database";
const socketIo = require("socket.io");

const PORT = process.env.PORT || 1328;

loadDB();

const server = http.createServer(app.callback());

server.listen(PORT, () =>
  console.log(`running on port http://localhost:${PORT}`)
);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  socket.emit("FromAPI", response);
};
