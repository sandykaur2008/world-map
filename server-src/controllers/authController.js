'use strict'; 
import * as auth from '../config/auth';
import { validationResult } from 'express-validator/check';  

export function getRegister(req, res) {
  if (req.user) {
    res.json({ user: req.user }); 
  } else {
    res.json({ user: null });
  }
}

export function postRegister(req, res) {
  console.log('user signup');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array(); 
    return res.json({error: error});
    } 
  auth.addUser(req.body).then((results) => {
    if (results) {
      return res.send("success"); 
    } else {
      const error = [{msg: `Sorry, already a user with the username: ${req.body.username}`}]; 
      return res.json({error: error});
    }
  });
}



