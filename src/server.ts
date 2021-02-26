import app from "./app";
import http from "http";
import { loadDB } from "./database";
import { addTodo, deleteTodo, updateTodo } from "./socket";
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

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.join("Socket:" + socket.handshake.auth.userId);

  socket.on("addTodo", async (data: any) => {
    const todo = await addTodo(data);
    io.to("Socket:" + socket.handshake.auth.userId).emit(
      "addTodoSuccess",
      todo
    );
  });

  socket.on("deleteTodo", async (data: any) => {
    const id = await deleteTodo(data);
    io.in(socket.handshake.auth.userId).emit("deleteTodoSuccess", id);
  });

  socket.on("updateTodo", async (data: any) => {
    const todo = await updateTodo(data);
    io.in(socket.handshake.auth.userId).emit("updateTodoSuccess", todo);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
