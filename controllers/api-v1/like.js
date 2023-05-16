// Like Controller
//
const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute")

// GET /like/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the like endpoint" });
    }   
);

// GET /like/:id - get like by id
router.get("/:id", async (req, res) => {
    try {
        // find like by id
        const like = await db.Like.findById(req.params.id);
        // send res with like
        res.json({ like });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// POST /like/ - create like
router.post("/", authLockedRoute, async (req, res) => {
    try {
        // create like
        const like = await db.Like.create({
            user_id: req.body.user_id,
            game_id: req.body.game_id
        });
        // send res with like
        res.json({ like });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// DELETE /like/:id - delete like by id
router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        // find like by id and delete
        const like = await db.Like.findByIdAndDelete(req.params.id);
        // send res with like
        res.json({ like });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

module.exports = router;