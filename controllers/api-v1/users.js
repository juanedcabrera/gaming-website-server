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

// POST /users/register - create new user
router.post("/register", async (req, res) => {
  try {
    // check if user exists in db by email
    const findUser = await db.User.findOne({
      email: req.body.email,
    });
    // if user exists, return 400 error
    if (findUser) return res.status(400).json({ msg: "user already exists" });
    // hash password from req.body
    const password = req.body.password;
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create new user
    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
      avatar: req.body.avatar,
      bio: req.body.bio,
    });
    // create token payload
    const payload = {
      name: newUser.name,
      email: newUser.email,
      userName: newUser.userName,
      avatar: newUser.avatar,
      bio: newUser.bio,
      id: newUser.id,
    };
    // sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    // destructure newUser object
    const { id, name, email, userName, avatar, bio } = newUser;
    // send res with token and newUser object
    res.json({ token, user: { id, name, email, userName, avatar, bio } });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

<<<<<<< HEAD
=======
// Get /users/login - login user and return JWT
router.post("/login", async (req, res) => {
  try {
    // find user by email
    const findUser = await db.User.findOne({
      email: req.body.email,
    });
    // if user doesn't exist, return 400 error
    if (!findUser) return res.status(400).json({ msg: "bad request" });
    // check if passwords match
    const match = await bcrypt.compare(req.body.password, findUser.password);
    // if passwords don't match, return 400 error
    if (!match) return res.status(400).json({ msg: "bad request" });
    // create token payload
    const payload = {
      name: findUser.name,
      email: findUser.email,
      userName: findUser.userName,
      avatar: findUser.avatar,
      bio: findUser.bio,
      id: findUser.id,
    };
    // sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    // destructure findUser object
    const { id, name, email, userName, avatar, bio } = findUser;
    // send response with token and findUser object
    res.json({ token, user: { id, name, email, userName, avatar, bio } });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});


>>>>>>> upload

// GET /users/:id - get user by id
router.get("/:id", async (req, res) => {
  try {
    // find user by id
    const findUser = await db.User.findById(req.params.id).select("-password");
    // destructure findUser object
    const { id, name, email, userName, avatar, bio } = findUser;
    // send res with findUser object
    res.json({ user: { id, name, email, userName, avatar, bio } });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

// PUT /users/:id - update user by id
router.put("/:id", async (req, res) => {
  try {
    // find user by id and update
    const updateUser = await db.User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        avatar: req.body.avatar,
        bio: req.body.bio,
      },
      { new: true }
    );
    // destructure updateUser object
    const { id, name, email, userName, avatar, bio } = updateUser;
    // send res with updateUser object
    res.json({ user: { id, name, email, userName, avatar, bio } });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

// DELETE /users/:id - delete user by id
router.delete("/:id", async (req, res) => {
  try {
    // find user by id and delete
    const deleteUser = await db.User.findByIdAndDelete(req.params.id);
    // destructure deleteUser object
    const { id, name, email, userName, avatar, bio } = deleteUser;
    // send res with deleteUser object
    res.json({ user: { id, name, email, userName, avatar, bio } });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

// GET /users/:id/followers - get user followers by id
router.get("/:id/followers", async (req, res) => {
  try {
    'use strict';
    // find user by id
    const findUser = await db.User.findById(req.params.id);
    // find user followers
    const findFollowers = await db.Follow.find({ following_id: findUser.id });
    // create followers array
    const followers = [];
    // loop through findFollowers
    for (let i = 0; i < findFollowers.length; i++) {
    // find follower by id
    const findFollower = await db.User.findById(findFollowers[i].follower_id);
    // push findFollower to followers array
    followers.push(findFollower);
    }
    // send res with followers array
    res.json({ followers });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

// GET /users/:id/following - get user following by id
router.get("/:id/following", async (req, res) => {
  try {
    'use strict';
    // find user by id
    const findUser = await db.User.findById(req.params.id);
    // find user following
    const findFollowing = await db.Follow.find({ follower_id: findUser.id });
    // create following array
    const following = [];
    // loop through findFollowing
    for (let i = 0; i < findFollowing.length; i++) {
    // find following by id
    const findFollow = await db.User.findById(findFollowing[i].following_id);
    // push findFollow to following array
    following.push(findFollow);
    }
    // send res with following array
    res.json({ following });
  } catch (error) {
    // log error
    console.log(error);
    // return 500 error if something goes wrong
    res.status(500).json({ msg: "internal server error" });
  }
});

// POST /users/:id/follow - follow user by id
router.post("/:id/follow", async (req, res) => {
  try {
    // Find the user who wants to follow
    const followerId = req.user.id; // Assuming the authenticated user's ID is available through req.user
    const follower = await db.User.findById(followerId);

    // Find the user to be followed
    const followingId = req.params.id;
    const following = await db.User.findById(followingId);

    // Check if the follower and following users exist
    if (!follower || !following) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the user is already being followed
    const existingFollow = await db.Follow.findOne({
      follower_id: followerId,
      following_id: followingId,
    });

    if (existingFollow) {
      return res.status(400).json({ msg: "User is already being followed" });
    }

    // Create a new follow entry
    const newFollow = await db.Follow.create({
      follower_id: followerId,
      following_id: followingId,
    });

    // Add the followed user to the follower's following list
    follower.following.push(newFollow._id);
    await follower.save();

    // Add the follower user to the following user's follower list
    following.followers.push(newFollow._id);
    await following.save();

    // Return the updated follower user
    res.json({ follower });
  } catch (error) {
    // Error handling...
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});


module.exports = router;
