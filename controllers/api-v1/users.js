const express = require("express");
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authLockedRoute = require("./authLockedRoute")

// GET /users/ - test endpoint
router.get("/", (req, res) => {
  res.json({ msg: "welcome to the users endpoint" });
});

module.exports = router;
