'use strict'; 
import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export async function getMarkers(email) {
  try {
    const user = await User.findOne({ email: email}); 
    return user.markers;
  } catch (err) {
    console.log(err); 
  }
}

export async function saveMarkers(email, {savedMarkers}) {
  try {
    const user = await User.findOneAndUpdate({ email: email},
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