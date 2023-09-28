// post Controller
const express = require('express');
const router = express.Router();
const authLockedRoute = require('./authLockedRoute');
const Post = require('../models/Post');
const db = require('../models/');
const Game = require('../models/Game');

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

// POST /post/:gameId - create a new post
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
      imageLink: req.body.imageLink,
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

// PUT /post/:postid - update a post
router.put('/:postid', authLockedRoute, async (req, res) => {
  try {
    // find post by id and update
    const updatePost = await Post.findByIdAndUpdate(
      req.params.postid,
      {
        title: req.body.title,
        content: req.body.content,
        videoLink: req.body.videoLink,
        imageLink: req.body.imageLink,
      },
      { new: true }
    );
    // send res with updatePost object
    res.json({ updatePost });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: 'internal server error' });
  }
});

// DELETE /post/:postid - delete a post
router.delete('/:postid', authLockedRoute, async (req, res) => {
  try {
    // find post by id and delete
    const deletePost = await Post.findByIdAndDelete(req.params.postid);
    // send res with deletePost object
    res.json({ deletePost });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: 'internal server error' });
  }
});

// GET /:postid - get specific post by post id
router.get('/:postid', async (req, res) => {
  try {
    // find post by id
    const post = await Post.findById(req.params.postid);
    // send res with post
    res.json({ post });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: 'internal server error' });
  }
});


// GET /all/:gameId - get all post by id
router.get('/all/:gameId', async (req, res) => {
  try {
    // find post by id
    const post = await Game.findById(req.params.gameId);
    const posts = await Post.find({ gameId: req.params.gameId });
    // send res with post
    res.json({ post, posts });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: 'internal server error' });
  }
});





module.exports = router;
