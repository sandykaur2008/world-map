'use strict'; 
import passport from 'passport'; 
import User from '../database/models/user'; 
import {Strategy} from 'passport-local'; 

export function localStrategy() {
  passport.use(new Strategy(
	  {
		  usernameField: 'username' // not necessary, DEFAULT
	  },
	  function(username, password, done) {
		  User.findOne({ username: username }, (err, user) => {
			  if (err) {
				  return done(err);
			  }
			  if (!user) {
				  return done(null, false, { message: 'Incorrect username' });
		  	}
			  if (!user.checkPassword(password)) {
				  return done(null, false, { message: 'Incorrect password' });
			  }
			  return done(null, user); 
		  }); 
	  }
  )); 
} 