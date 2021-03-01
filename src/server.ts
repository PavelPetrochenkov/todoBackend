import app from './app';
import { ObjectId } from "mongodb";
import http from 'http';
import { loadDB } from './database';
import {
  addTodo,
  checkAllTodos,
  deleteCompletedTodos,
  deleteTodo,
  getTodos,
  updateTodo,
} from './socket';
import { verifyToken,
  createToken,
  createRefreshToken, } from './jwt/jwt';
const socketIo = require('socket.io');
import jwt_decode from "jwt-decode";
import refreshTokensCollection from "./api/models/refreshTokensModels";
import userCollection from "./api/models/userModels";

const PORT = process.env.PORT || 1328;

loadDB();

const server = http.createServer(app.callback());

server.listen(PORT, () => console.log(`running on port http://localhost:${PORT}`));

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

io.use((socket, next) => {
  try {
    verifyToken(socket.handshake.headers.token);
    next();
  } catch (err) {
    return err;
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.join('Socket:' + socket.handshake.headers.userid);

  const userId = socket.handshake.headers.userid;

  socket.on('getTodos', async (userId: string) => {
    const todos = await getTodos(userId);
    io.to('Socket:' + socket.handshake.headers.userid).emit('getTodosSuccess', todos);
  });

  socket.on('addTodo', async (text: string) => {
    const todo = await addTodo(text, userId);
    io.to('Socket:' + socket.handshake.headers.userid).emit('addTodoSuccess', todo);
  });

  socket.on('deleteTodo', async (id: string) => {
    await deleteTodo(id);
    io.to('Socket:' + socket.handshake.headers.userid).emit('deleteTodoSuccess', id);
  });

  socket.on('changeTodo', async (id: string, userId: string, opt) => {
    let todo;

    if (typeof opt === 'boolean') {
      todo = await updateTodo({ id, userId, check: opt });
    } else {
      todo = await updateTodo({ id, userId, text: opt });
    }

    io.to('Socket:' + socket.handshake.headers.userid).emit('changeTodoSuccess', todo);
  });

  socket.on('checkAllTodos', async (userId: string, check: boolean) => {
    const todos = await checkAllTodos({ userId, check });

    io.to('Socket:' + socket.handshake.headers.userid).emit('checkAllTodosSuccess', todos);
  });

  socket.on('clearAllCompletedTodos', async (userId: string) => {
    const todos = await deleteCompletedTodos(userId);
    io.to('Socket:' + socket.handshake.headers.userid).emit('clearAllCompletedTodosSuccess', todos);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.disconnect();
  });
});

const refreshToken = async (refreshToken) => {
  try {
    const decodedToken: { id: string } = jwt_decode(refreshToken);

    const res = await refreshTokensCollection.findOne({
      _id: ObjectId(decodedToken.id),
    });

    if (!res && res.refreshToken !== refreshToken) {
      return;
    }
    verifyToken(refreshToken);
    const newToken = createToken(decodedToken.id);
    const newRefreshToken = createRefreshToken(decodedToken.id);

    await refreshTokensCollection.updateOne({
      _id: ObjectId(decodedToken.id),
      refreshToken: newRefreshToken,
    });

    const user = await userCollection.findOne({
      _id: ObjectId(decodedToken.id),
    });
   
    return {
      token:newToken,
      refreshToken:newRefreshToken
    }
  } catch {
    return;
  }
};
