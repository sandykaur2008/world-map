import passport from 'passport'; 
import {localStrategy} from './localStrategy'; 
import User from '../database/models/user'; 
localStrategy(); 
// called on login, saves the id to session req.session.passport.user = {id:'..'}
export function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session()); 

  passport.serializeUser((user, done) => {
	  console.log('*** serializeUser called, user: '); 
	  console.log(user); // the whole raw user object!
	  console.log('---------'); 
	  return done(null, { _id: user._id }); 
  }); 

// user object attaches to the request as req.user
  passport.deserializeUser((id, done) => {
	  console.log('DeserializeUser called'); 
	  User.findOne(
		  { _id: id },
		  'username',
		  (err, user) => {
			  console.log('*** Deserialize user, user:'); 
			  console.log(user); 
			  console.log('--------------'); 
			  return done(null, user); 
		  }
	  ); 
  }); 
} 