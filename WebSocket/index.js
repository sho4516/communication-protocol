import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static(path.resolve()));
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "/index.html"));
});

io.on("connection", (socket) => {
  console.log("connection established");

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });
});

server.listen(4000, () => console.log("Server running on port 4000"));
