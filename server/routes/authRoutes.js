'use strict'; 
import express from 'express';
import * as auth from '../controllers/authController'; 
const authRouter = express.Router(); 

export function arouter() {
  authRouter.route('/register')
    .get(auth.getRegister) 
    .post(auth.postRegister); 
  authRouter.route('/login')
   .get(auth.getLogin)  
  authRouter.route('/logout')
    .get(auth.getLogout); 
  authRouter.route('/forgot')
    .get(auth.getForgot)
    .post(auth.postForgot); 
  return authRouter; 
} 
