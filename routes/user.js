const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/profiles',passport.checkAuthentication, userController.profile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
// router.post('/create-session', passport.authenticate(
//     'local',
//     {failureRedirect: '/users/sign-in'}
// ),userController.createSession);
router.post('/create-session', (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/users/sign-in', failureFlash: true })(req, res, next);
  }, userController.createSession);
  
router.get('/sign-out', userController.signOut);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in', failureFlash:true}), userController.createSession);

module.exports = router;