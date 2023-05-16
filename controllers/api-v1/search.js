// Search Controller

const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute")

// GET /search/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the search endpoint" });
    }
);

// GET /search/:query - search for users and games
router.get("/:query", async (req, res) => {
    try {
        // search for users and games
        const users = await db.User.find({ userName: { $regex: req.params.query, $options: "i" } });
        const games = await db.Game.find({ title: { $regex: req.params.query, $options: "i" } });
        // send res with users and games
        res.json({ users, games });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}   
);

module.exports = router;
