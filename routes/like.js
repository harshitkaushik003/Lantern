const express = require('express');
const passport = require('passport');
const router = express.Router();

const likeController = require('../controllers/like_controller');


router.get('/toggle',passport.checkAuthentication, likeController.toggleLike);
module.exports = router;