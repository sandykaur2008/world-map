'use strict'; 
import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export async function getMarkers({username}) {
  try {
    const user = await User.findOne({ username: username}); 
    return user.markers;
  } catch (err) {
    console.log(err); 
  }
}

export async function saveMarkers({username}, {savedMarkers}) {
  try {
    const user = await User.findOneAndUpdate({ username: username},
      {
        $set: {markers: savedMarkers}
      },
      { new: true}
    ); 
    return user.markers; 
  } catch (err) {
    console.log(err); 
  }
}