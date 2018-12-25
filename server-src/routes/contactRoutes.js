'use strict'; 
import express from 'express';
import * as contact from '../controllers/contactController'; 
import { body } from 'express-validator/check'; 
const contactRouter = express.Router(); 

export function crouter() {
  contactRouter.route('/')
    .post([
      body('comments', 'Empty Message Field').not().isEmpty().trim(), 
      body('name', 'Empty Name Field').not().isEmpty().trim(),
      body('email', 'Invalid Email').isEmail().normalizeEmail()
      ], contact.postContact); 
  return contactRouter; 
} 