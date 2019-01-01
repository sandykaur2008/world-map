'use strict'; 
import express from 'express';
import * as auth from '../controllers/authController'; 
import { body } from 'express-validator/check'; 
const authRouter = express.Router(); 
import passport from 'passport'; 

export function arouter() {
  authRouter.route('/getuser')
    .get(auth.getRegister) 
    .post([
      body('username', 'Empty Username Field').not().isEmpty().trim().escape(), 
      body('email', 'Invalid Email').not().isEmpty().isEmail().normalizeEmail(), 
      body('password', 'Password must be at least 5 characters').isLength({ min: 5}).trim().escape()
        .custom((value, {req, loc, path}) => {
          if (value !== req.body.password2) {
            throw new Error('Passwords do not match');
          } else {
            return value;
          }
        })
    ], auth.postRegister); 
  authRouter.route('/login')
    .post(passport.authenticate('local'),
    (req, res) => {
      var userInfo = {
        username: req.user.username
      };
      res.send(userInfo);
    }); 
  authRouter.route('/logout')
    .post((req, res) => {
      if (req.user) {
        req.logout();
        res.send({ msg: 'logging out' }); 
      } else {
        res.send({ msg: 'no user to log out' });
      }
    }); 
  authRouter.route('/forgot')
    .post([
      body('email', 'Invalid Email').not().isEmpty().isEmail().normalizeEmail()
    ], auth.postForgot); 
  authRouter.route('/reset/:token')
  .get(auth.getReset)
  .post([
    body('password', 'Password must be at least 5 characters').isLength({ min: 5}).trim().escape()
      .custom((value, {req, loc, path}) => {
        if (value !== req.body.password2) {
<<<<<<< HEAD
          throw new Error('Passwords do not match');
=======
            throw new Error('Passwords do not match');
>>>>>>> routing
        } else {
          return value;
        }
      })
  ], auth.postReset); 
  return authRouter; 
} 
