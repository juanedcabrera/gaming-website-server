// Comment API
const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute")

// GET /comment/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the comment endpoint" });
    }
);

// GET /comment/:id - get comment by id
router.get("/:id", async (req, res) => {
    try {
        // find comment by id
        const comment = await db.Comment.findById(req.params.id);
        // send res with comment
        res.json({ comment });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// POST /comment/ - create comment
router.post("/", authLockedRoute, async (req, res) => {
    try {
        // create comment
        const comment = await db.Comment.create({
            content: req.body.content,
            user_id: req.body.user_id,
            game_id: req.body.game_id
        });
        // send res with comment
        res.json({ comment });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// PUT /comment/:id - update comment by id
router.put("/:id", authLockedRoute, async (req, res) => {
    try {
        // find comment by id and update
        const comment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            {
                content: req.body.content
            },
            { new: true }
        );
        // send res with comment
        res.json({ comment });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// DELETE /comment/:id - delete comment by id
router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        // find comment by id and delete
        const comment = await db.Comment.findByIdAndDelete(req.params.id);
        // send res with comment
        res.json({ comment });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }

}
);

module.exports = router;