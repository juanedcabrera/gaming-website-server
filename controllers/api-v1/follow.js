// Follow API controller
const express = require("express");
const router = express.Router(); 
const db = require('../models');
const authLockedRoute = require('./authLockedRoute');

// GET /follow/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the follow endpoint" });
    }
);

// GET /follow/:id - get follow by id
router.get("/:id", async (req, res) => {
    try {
        // find follow by id
        const follow = await db.Follow.findById(req.params.id);
        // send res with follow
        res.json({ follow });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// POST /follow/ - create follow
router.post("/", authLockedRoute, async (req, res) => {
    try {
        // create follow
        const follow = await db.Follow.create({
            follower_id: req.body.follower_id,
            following_id: req.body.following_id
        });
        // send res with follow
        res.json({ follow });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// DELETE /follow/:id - delete follow by id
router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        // find follow by id and delete
        const follow = await db.Follow.findByIdAndDelete(req.params.id);
        // send res with follow
        res.json({ follow });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

module.exports = router;
