// Game Controller
//
const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute")

// GET /game/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the game endpoint" });
    }
);

// GET /game/:id - get game by id
router.get("/:id", async (req, res) => {
    try {
        // find game by id
        const game = await db.Game.findById(req.params.id);
        // send res with game
        res.json({ game });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// POST /game/ - create game
router.post("/", authLockedRoute, async (req, res) => {
    try {
        // create game
        const game = await db.Game.create({
            title: req.body.title,
            userName: req.body.userName,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image,
            user_id: req.body.user_id
        });
        // send res with game
        res.json({ game });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// PUT /game/:id - update game by id
router.put("/:id", authLockedRoute, async (req, res) => {
    try {
        // find game by id and update
        const game = await db.Game.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image
            },
            { new: true }
        );
        // send res with game
        res.json({ game });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// DELETE /game/:id - delete game by id
router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        // find game by id and delete
        const game = await db.Game.findByIdAndDelete(req.params.id);
        // send res with game
        res.json({ game });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

module.exports = router;