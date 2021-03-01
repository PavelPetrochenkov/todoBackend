import app from "./app";
import { ObjectId } from "mongodb";
import http from "http";
import { loadDB } from "./database";
import {
  addTodo,
  checkAllTodos,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./socket";
import refreshTokensCollection from "./api/models/refreshTokensModels";
import { checkAuth } from "./socket/auth";

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

io.use((socket, next) => {
  try {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      () => {}
    );
    next();
  } catch (err) {
    return err;
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  const userId = socket.handshake.headers.userid;
  const userGroup = "Socket:" + userId;

  socket.join(userGroup);

  socket.on("getTodos", async (userId: string) => {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      async () => {
        const todos = await getTodos(userId);
        io.to(userGroup).emit("getTodosSuccess", todos);
      }
    );
  });

  socket.on("addTodo", async (text: string) => {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      async () => {
        const todo = await addTodo(text, userId);
        io.to(userGroup).emit("addTodoSuccess", todo);
      }
    );
  });

  socket.on("deleteTodo", async (id: string) => {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      async () => {
        await deleteTodo(id);
        io.to(userGroup).emit("deleteTodoSuccess", id);
      }
    );
  });

  socket.on(
    "changeTodo",
    async (id: string, userId: string, opt: string | boolean) => {
      checkAuth(
        socket.handshake.headers.token,
        socket.handshake.headers.refreshtoken,
        socket,
        async () => {
          let todo;

          if (typeof opt === "boolean") {
            todo = await updateTodo({ id, userId, check: opt });
          } else {
            todo = await updateTodo({ id, userId, text: opt });
          }

          io.to(userGroup).emit("changeTodoSuccess", todo);
        }
      );
    }
  );

  socket.on("checkAllTodos", async (userId: string, check: boolean) => {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      async () => {
        const todos = await checkAllTodos({ userId, check });

        io.to(userGroup).emit("checkAllTodosSuccess", todos);
      }
    );
  });

  socket.on("clearAllCompletedTodos", async (userId: string) => {
    checkAuth(
      socket.handshake.headers.token,
      socket.handshake.headers.refreshtoken,
      socket,
      async () => {
        const todos = await deleteCompletedTodos(userId);
        io.to(userGroup).emit("clearAllCompletedTodosSuccess", todos);
      }
    );
  });

  socket.on("disconnect", async () => {
    await refreshTokensCollection.updateOne({
      _id: ObjectId(userId),
      refreshToken: "",
    });
    console.log("Client disconnected");
    socket.disconnect();
  });
});
