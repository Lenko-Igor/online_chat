const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");

const app = express();

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room });
    const message = isExist
      ? `${user.name} here you again`
      : `Hello, ${user.name} from ${user.room} room`;

    socket.emit("message", {
      data: {
        name: "Admin",
        message,
      },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: {
        name: "Admin",
        message: `${user.name} has joined to ${user.room} room`,
      },
    });

    io.to(user.room).emit('room', {
      data: {
        users: getRoomUsers(user.room),
      },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit("message", {
        data: {
          name: user.name,
          message,
        },
      });
    }
  });

  socket.on("leaveRoom", ({ params }) => {
    const removedUser = removeUser(params);

    if (removedUser) {
      io.to(removedUser.room).emit("message", {
        data: {
          name: "Admin",
          message: `${removedUser.name} has left chat`,
        },
      });

      io.to(removedUser.room).emit('room', {
        data: {
          users: getRoomUsers(removedUser.room),
        },
      });
    }
  });

  io.on("disconnect", () => console.log("Disconnect"));
});

server.listen(5000, () => {
  console.log("Server has been run on 5000 port");
});
