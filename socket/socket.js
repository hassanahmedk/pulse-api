const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
// const cors = require('cors')

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};
const userSocketMap = {}; //takes userid as a key and socketId as value
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("connected to the user ", socket.id, "with user id ", userId);
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
    console.log("userSocketMap is ", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  //socket.on is used for listening.
  socket.on("disconnect", () => {
    console.log("user is disconnected", socket.id);

    console.log("userSocketMap in first", userSocketMap);
    delete userSocketMap[userId];
    console.log("userSocketMap is ", userSocketMap);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };

//gpt 4
// const express = require('express');
// const { Server } = require("socket.io");
// const http = require('http');

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"],
//         credentials: true,
//     }
// });

// io.on("connection", (socket) => {
//     console.log("connected to the user ", socket.id);

//     socket.on("disconnect", () => {
//         console.log("user is disconnected", socket.id);
//     });

//     socket.on("error", (err) => {
//         console.error("Socket.io error: ", err);
//     });
// });

// module.exports = { io, app, server };
