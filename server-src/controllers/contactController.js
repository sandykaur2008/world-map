'use strict'; 
import {mailer} from '../config/mailer';
import { validationResult } from 'express-validator/check';  

export function postContact(req, res) {
  const messages = validationResult(req);
  if (!messages.isEmpty()) {
    const message = messages.array(); 
    return res.json({message: message});
  } 
  const mailOpts = {
    from: req.body.email, 
    to: process.env.MAIL_USERNAME,
    subject: 'Map site message!',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.comments}`
  }; 
  mailer().sendMail(mailOpts, (error, info) => {
    if (error) {
      const message = [{msg: 'Error occurred'}];
      return res.json({message: message});
    } else {
    const message = [{msg: 'Thank you for your email!'}];
    return res.json({message: message});
    }
  });  
}