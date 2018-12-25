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

export async function saveMarkers({username}, {savedMarkers}) {
  console.log("before map config" + savedMarkers); 
  try {
    const user = await User.findOneAndUpdate({ username: username},
      {
        $set: {markers: savedMarkers}
      },
      { new: true}
    ); 
    console.log("inside map config" + user.markers); 
    return user.markers; 
  } catch (err) {
  console.log(err); 
  }
}