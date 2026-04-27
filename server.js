const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {

  socket.on("join", room => {
    socket.join(room);
    socket.to(room).emit("ready");
  });

  socket.on("offer", ({ offer, room }) => {
    socket.to(room).emit("offer", offer);
  });

  socket.on("answer", ({ answer, room }) => {
    socket.to(room).emit("answer", answer);
  });

  socket.on("ice", ({ candidate, room }) => {
    socket.to(room).emit("ice", candidate);
  });

});

server.listen(3000, () => console.log("Server running on 3000"));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Server running"));