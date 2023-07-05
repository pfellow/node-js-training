const express = require('express');
const { check } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset-password', authController.getReset);

router.get('/reset-password/:token', authController.getNewPassword);

router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .normalizeEmail(),
    check(
      'password',
      'Password should contain only numbers and letters and be at least 5 characters long'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userObj) => {
          if (userObj) {
            return Promise.reject('User with this email already registered!');
          }
        });
      })
      .normalizeEmail(),
    check(
      'password',
      'Please enter a password with only numbers and letters and at least 5 characters long'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    check('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match!");
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/reset-password', authController.postReset);

router.post('/new-password', authController.postNewPassword);

router.post('/logout', authController.postLogout);

module.exports = router;
