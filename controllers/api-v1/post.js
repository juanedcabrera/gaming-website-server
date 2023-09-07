// post Controller
const express = require('express');
const router = express.Router();
const authLockedRoute = require('./authLockedRoute');
const Post = require('../models/Post');
const db = require('../models/');

// GET /post/ - test endpoint
router.get('/', (req, res) => {
  res.json({ msg: 'welcome to the post endpoint' });
});

// GET /post/all - get all posts
router.get('/all', async (req, res) => {
  try {
    // find all posts
    const posts = await Post.find();
    // send res with posts
    res.json({ posts });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: 'internal server error' });
  }
});

router.post('/:gameId', authLockedRoute, async (req, res) => {
  console.log("post route hit")
  try {
    const user = await db.User.findOne({ userName: req.body.userName });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    console.log('GameID',req.params.gameId)

    const newBlogPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageLink,
      videoLink: req.body.videoLink,
      gameId: req.params.gameId,
    });

    const newPostToGame = await db.Game.findByIdAndUpdate(
      req.params.gameId,
      {
        $push: { posts: newBlogPost._id },
      },
      { new: true }
    );

    console.log('Game Post ID',newPostToGame);

    res.status(201).json({ newBlogPost, newPostToGame });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
});

module.exports = router;
