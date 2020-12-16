require("dotenv").config();

const app = require("./app");
const httpSocket = require("./socket");

const PORT = process.env.PORT || 8080;
const PORT_SOCKET = process.env.PORT_SOCKET || 8081;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

httpSocket.listen(PORT_SOCKET, () => {
  console.log(`Socket is listening on port ${PORT_SOCKET}`);
});
