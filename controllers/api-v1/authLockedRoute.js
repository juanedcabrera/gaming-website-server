// Authlockedroute
<<<<<<< Updated upstream

const express = require('express');
const router = express.Router();
=======
>>>>>>> Stashed changes
const jwt = require('jsonwebtoken');

const authLockedRoute = async (req, res, next) => {
    try {
        // get token from Authorization header
        const authHeader = req.headers.authorization;
        // check if authHeader is defined
        if (authHeader) {
            // get token from authHeader
            const token = authHeader
            // verify token
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            // attach payload to req object
            req.payload = payload;
            // move on to next middleware
            next();
        } else {
            // if authHeader is undefined return 401 error
            res.status(401).json({ msg: 'Auth Error' });
        }
    } catch (error) {
        // log error
        console.log(error);
        // return 500 error if something goes wrong
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

module.exports = authLockedRoute;