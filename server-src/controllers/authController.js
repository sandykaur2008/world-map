'use strict'; 
import * as auth from '../config/auth';

export function getRegister(req, res) {
  if (req.user) {
    res.json({ user: req.user }); 
  } else {
    res.json({ user: null });
  }
}

export function postRegister(req, res) {
  console.log('user signup');
  const results = auth.addUser(req.body); 
  if (results) {
    res.json(results); 
  } else {
    res.json({
      error: `Sorry, already a user with the username: ${req.body.username}`
    });
  }
}



