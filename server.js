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

// GET / test index
app.get("/", (req, res) => {
  res.json({ msg: "hello backend 🤖" });
});

// controllers
app.use("/api-v1/users", require("./controllers/api-v1/users"));

// hey listen
app.listen(PORT, () => {
  rowdyResults.print();
  console.log(`You're currently on ${PORT} 🦻`);
});
