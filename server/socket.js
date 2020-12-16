const httpSocket = require("http").createServer();
const io = require("socket.io")(httpSocket);

io.on("connection", (socket) => {
  socket.emit("message", "connected");
  socket.on("message", (data) => {
    console.log("data", data);
    socket.emit("message", `your message was: ${data}`);
  });
});

module.exports = httpSocket;
