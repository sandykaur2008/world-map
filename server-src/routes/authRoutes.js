'use strict'; 
import express from 'express';
import * as auth from '../controllers/authController'; 
const authRouter = express.Router(); 
import passport from 'passport'; 

export function arouter() {
  authRouter.route('/')
    .get(auth.getRegister) 
    .post(auth.postRegister); 
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
        res.send({ msg: 'no user to log out' })
      }
    }); 
  return authRouter; 
} 
