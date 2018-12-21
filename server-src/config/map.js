'use strict'; 
import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export async function getMarkers({username}) {
  try {
    const user = await User.findOne({ username: username}); 
    console.log(user.markers); 
    return user.markers;
      } 
     catch (err) {
  console.log(err); 
  }
}

export async function saveMarkers({username, markers}) {
  try {
    const user = await User.updateOne(
      { username: username},
      {
        $set: {markers: markers}
      }
    ); 
    console.log("inside map config" + user.markers); 
    return user.markers; 
  } catch (err) {
  console.log(err); 
  }
}