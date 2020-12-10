const app = require("./app");
// require("dotenv").config();
// const PORT = process.env.PORT || 8080;
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
