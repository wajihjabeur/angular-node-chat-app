const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:4200"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (data) => {
    socket.join(data.room);
    console.log(data.username + "joined the room" + data.room);
    socket.broadcast.to(data.room).emit("new user joined", {
      username: data.username,
      message: `has joined this room`,
    });
  });

  socket.on("message", (data) => {
    io.in(data.room).emit("new message", {
      username: data.username,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
http.listen(3000, () => {
  console.log("listening on port=3000");
});
