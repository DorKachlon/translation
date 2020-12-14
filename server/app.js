const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
app.use(express.json());

app.use("/api", require("./api"));

// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
// app.use('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
// });

app.use("*", (req, res) => {
  res.sendStatus(404);
});

const server = http.createServer(app);
const io = socketIo(server);
let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = app;
