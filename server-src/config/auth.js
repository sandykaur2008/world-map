import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


export function addUser({username, password}) {
  User.findOne({ username: username }, (err, user) => {
    if (err) {
        console.log('User.js post error: ', err); 
    } else if (user) {
        return null; 
    }
    else {
        const newUser = new User({
            username: username,
            password: password
        })
        newUser.save((err, savedUser) => {
            if (err) {
              console.log(err); 
            } else {
              return savedUser; 
            }
        }); 
    }
  }); 
} 