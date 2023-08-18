// Game Controller
const express = require("express");
const router = express.Router();
const db = require("../models");
const authLockedRoute = require("./authLockedRoute");

// GET /game/ - test endpoint
router.get("/", (req, res) => {
    res.json({ msg: "welcome to the game endpoint" });
    }
);

// GET /game/all - get all games
router.get("/all", async (req, res) => {
    try {
        // find all games
        const games = await db.Game.find();
        // send res with games
        res.json({ games });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);

// This is not working until we get proper ObjectIDs in the database
// Route to get 10 random games
router.get("/random", async (req, res) => {
    try {
      // Fetch 10 random games from the database
      const games = db.Game.aggregate([{ $sample: { size: 10 } }])
    
      // Send the games array as the response
      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

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
router.post("/upload", authLockedRoute, async (req, res) => {
    try {
      // find user
      const user = await db.User.findOne({ userName: req.body.userName });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // create game
      const newGame = await db.Game.create({
        title: req.body.title,
        userName: req.body.userName,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        techstack: req.body.techstack,
        link: req.body.link,
        github: req.body.github,
        userId: user._id,
      });
  
      console.log('Game is here: ', newGame);
  
      // send response with game
      res.json({ newGame });
    } catch (error) {
      // log error
      console.log(error);
      // return 500 error if something goes wrong
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  
  

// PUT /game/:id - update game by id
router.put("/:id", authLockedRoute, async (req, res) => {
    try {
        // find game by id and update
        const game = await db.Game.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                techstack: req.body.techstack,
                link: req.body.link,
                github: req.body.github,
                category: req.body.category,
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

// GET /game/category - get games by category
router.get("/category/:category", async (req, res) => {
    try {
        // find games by category
        const games = await db.Game.find({ category: req.params.category })
        // send res with games
        res.json({ games });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: "internal server error" });
    }
}
);


module.exports = router;