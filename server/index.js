const app = require("./app");
// require("dotenv").config();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;

const httpSocket = require("./socket");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

httpSocket.listen(8081, () => console.log("socket is listening..."));
