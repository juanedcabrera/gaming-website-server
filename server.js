// requires
const express = require("express");
const cors = require("cors");
const rowdy = require("rowdy-logger");

// express
const app = express();
const PORT = process.env.PORT || 8000;
// for debug logging
const rowdyResults = rowdy.begin(app);
// cross-origin resource sharing
app.use(cors());
// request body parsing
app.use(express.json());

// GET / index
app.get("/", (req, res) => {
  res.json({ msg: "hello backend 🤖" });
});

// controllers
app.use("/api-v1/users", require("./controllers/api-v1/users"));
app.use("/api-v1/game", require("./controllers/api-v1/game"));
app.use("/api-v1/like", require("./controllers/api-v1/like"));
app.use("/api-v1/comment", require("./controllers/api-v1/comment"));
app.use("/api-v1/follow", require("./controllers/api-v1/follow"));
app.use("/api-v1/search", require("./controllers/api-v1/search"));
app.use("/api-v1/auth", require("./controllers/api-v1/authentication"));

// hey listen
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`You're currently on ${PORT} 🦻`);
});

module.exports = app;