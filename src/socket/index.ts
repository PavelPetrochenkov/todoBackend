const socketIo = require("socket.io");

export const initSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log("New client connected");
    const userId = socket.handshake.headers.userid;
    socket.join("Socket:" + userId);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      socket.disconnect();
    });
  });

  return io;
};
