'use strict'; 
import * as auth from '../config/auth';
import {mailer} from '../config/mailer';
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
  const messages = validationResult(req);
  if (!messages.isEmpty()) {
    const message = messages.array(); 
    return res.json({message: message});
    } 
  auth.addUser(req.body).then((results) => {
    console.log("results:" + results); 
    if (results) {
      const message = [{msg: 'Thank you for signing up, please login!'}]; 
      return res.json({message: message, status: 1}); 
    } else {
      const message = [{msg: `Sorry, already a user with the username: ${req.body.username}`}]; 
      return res.json({message: message, status: 0});
    }
  });
}
    
export function postForgot(req, res) {
  const messages = validationResult(req);
  if (!messages.isEmpty()) {
    const message = messages.array(); 
    return res.json({message: message}); 
  }
  auth.sendReset(req.body, req.headers).then((results) => {
    if (results === null) {
      const message = [{msg: 'Email not registered'}];
      return res.json({message: message});
    } else  {mailer().sendMail(results, (error, info) => {
      if (error) {
        const message = [{msg: 'Error occurred'}];
        console.log(message); 
        return res.json({message: message});
      } else {
      const message = [{msg: 'Reset email sent!'}];
      return res.json({message: message});
      }});  }
  }); 
}

export function getReset(req, res) {
  console.log("before: " + req.params.token); 
  auth.reset(req.params).then((resetToken) => {
    if (resetToken === null) {
      console.log("null: " + resetToken); 
      const message = [{msg: 'Password reset token is invalid or has expired.'}];
      return res.json({message: message, status: 0});
    } else {
      console.log('not null' + resetToken); 
      return res.json({resetToken: resetToken}); 
      }
  });
} 

export function postReset(req, res) {
  const messages = validationResult(req);
  if (!messages.isEmpty()) {
    const message = messages.array(); 
    return res.json({message: message}); 
    }
  auth.doReset(req.body, req.params).then((results) => {
    if (results === null) {
      const message = [{msg: 'Password reset token is invalid or has expired.'}];
      return res.json({message: message, status: 0});
    } else {
      mailer().sendMail(results, (error, info) => {
        if (error) {
          const message = [{msg: 'Error occurred'}];
          console.log(message); 
          return res.json({message: message, status: 0});
        } else {
          const message = [{msg: 'Password has been reset'}];
          return res.json({message: message, status: 1});
          }
      });  
    }
  }); 
} 

