// Like Controller
//
const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute")
const mongoose = require("mongoose");

// GET /like/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the like endpoint" });
    }   
);

// GET /like/:id - get like by id
router.get("/:user/:game", async (req, res) => {
    try {
        // find like by game id and user id
        const like = await db.Like.findOne({ user: req.params.user, game: req.params.game });
        console.log({like})
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
        const { user_id, game_id } = req.body;
        console.log(req.body)
        // Check if user_id and game_id are valid ObjectId strings
        if (!mongoose.Types.ObjectId.isValid(user_id) || !mongoose.Types.ObjectId.isValid(game_id)) {
            return res.status(400).json({ msg: "Invalid user_id or game_id" });
        }

        // Create the like
        const like = await db.Like.create({
            user: user_id,
            game: game_id
        });
        console.log('This is like',like)

        // also add like to Game
        const game = await db.Game.findById(
            game_id,
        )
        console.log('This is game',game)
        
        game.likes.push(like._id);
        game.save();

        // send res with like
         res.json({ like });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// DELETE /like/:id - delete like by id
router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        // find like by id and delete
        const like = await db.Like.findByIdAndDelete(req.params.id);

        // delete like from Game
        const game = await db.Game.findById(
            like.game,
        );

        game.likes.pull(like._id);
        game.save();
       
        res.json({ like, game });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" }, error);
    }
}
);

module.exports = router;