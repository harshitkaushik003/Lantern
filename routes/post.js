const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.get('/', postController.post);
router.post('/create',passport.checkAuthentication, postController.create);
router.get('/delete/:id', passport.checkAuthentication, postController.destroy);
module.exports = router;