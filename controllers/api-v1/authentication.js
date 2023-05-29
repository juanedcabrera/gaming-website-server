// Authentication

const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authLockedRoute = require('./authLockedRoute')

// GET /users/ - test endpoint
router.get('/', (req, res) => {
    res.json({ msg: 'welcome to the users endpoint' });
}
);

// POST /users/register - create new user
router.post('/register', async (req, res) => {
    try {
        // check if user exists in db by email
        const findUser = await db.User.findOne({
            email: req.body.email,
        });
        // if user exists, return 400 error
        if (findUser) return res.status(400).json({ msg: 'user already exists' });
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
        res.status(500).json({ msg: 'internal server error' });
    }
}
);

// POST /users/login - authenticate user and return token
router.post('/login', async (req, res) => {
    try {
        // find user by email
        const findUser = await db.User.findOne({
            userName: req.body.userName,
        });
        // if user doesn't exist, return 400 error
        if (!findUser) return res.status(400).json({ msg: 'bad request' });
        // check if passwords match
        const match = await bcrypt.compare(req.body.password, findUser.password);
        // if passwords don't match, return 400 error
        if (!match) return res.status(400).json({ msg: 'bad request' });
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
        // send res with token and findUser object
        res.json({ token, user: { id, name, email, userName, avatar, bio } });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: 'internal server error' });
    }
}
);

// GET /users/auth-locked - test auth locked route
router.get('/auth-locked', authLockedRoute, (req, res) => {
    // send response with user info
    res.json({ user: req.user });
}
);

// GET /users/:id - get user by id
router.get('/:id', async (req, res) => {
    try {
        // find user by id
        const user = await db.User.findById(req.params.id);
        // send res with user
        res.json({ user });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: 'internal server error' });
    }
}
);

// PUT /users/:id - update user by id
router.put('/:id', authLockedRoute, async (req, res) => {
    try {
        // find user by id and update
        const user = await db.User.findByIdAndUpdate(
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
        // send res with updated user
        res.json({ user });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: 'internal server error' });
    }
}
);

// DELETE /users/:id - delete user by id
router.delete('/:id', authLockedRoute, async (req, res) => {
    try {
        // find user by id and delete
        const user = await db.User.findByIdAndDelete(req.params.id);
        // send res with deleted user
        res.json({ user });
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: 'internal server error' });
    }
}
);

module.exports = router;