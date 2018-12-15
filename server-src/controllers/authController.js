'use strict'; 
import * as auth from '../config/auth';

export function getRegister(req, res) {
  if (req.user) {
    res.json({ user: req.user,
      csrf: req.csrfToken()}); 
  } else {
    res.json({ user: null ,
      csrf: req.csrfToken()}); 
  }
}

export function postRegister(req, res) {
  console.log('user signup');
  const results = auth.addUser(req.body); 
  if (results) {
    res.json({results: results, 
      csrf: req.csrfToken()
    }); 
  } else {
    res.json({
      error: `Sorry, already a user with the username: ${req.body.username}`,
      csrf: req.csrfToken()
    });
  }
}



