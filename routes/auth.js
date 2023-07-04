const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset-password', authController.getReset);

router.get('/reset-password/:token', authController.getNewPassword);

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/reset-password', authController.postReset);

router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;
