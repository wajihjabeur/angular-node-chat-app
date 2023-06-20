const app = require("express")();
const http = require("http").createServer(app);
require("dotenv").config();
const redis = require("redis");

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

/*const client = redis.createClient({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
console.log(client);

client.on("connect", () => {
  console.log("Connected to our redis instance!");
  client.set("Greatest Basketball Player", "Lebron James");
});*/



const client =  redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
});
(async () => {
  // Connect to redis server
  await client.connect();
})();
client.on("connect", () => {
  console.log("Connected to our redis instance!");
  client.set("Greatest Basketball Player", "Lebron James");
});

http.listen(3000, () => {
  console.log("listening on port=3000");
});
