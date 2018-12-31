import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
import crypto from 'crypto'; 
import bcrypt from 'bcryptjs'; 


export async function addUser({username, email, password}) {
  try {
    const user = await User.findOne({$or: [
      { username: username },
      {email: email}
    ]}); 
      if (user === null) {
        const newUser = new User({
            username: username,
            email: email,
            password: password
        }); 
        newUser.save();
        return newUser;
      } 
     } catch (err) {
  console.log(err); 
  }
}

export async function sendReset({email}, {host}) {
  try {
    const user = await User.findOne({ email: email }); 
    if (user === null) {
      return null; 
      } else {
        const token = crypto.randomBytes(20).toString('hex'); 
        await User.updateOne(
          { email: user.email },
          {
            $set: {resetToken: token, expires: Date.now() + 300000}
          }
        );
        const mailOpts = {
          from: "sandysmaps.@gmail.com", 
          to: user.email,
          subject: 'Map site reset!',
          text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'https://sandysmapsite.herokuapp.com' + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }; 
        return mailOpts; 
      } 
  } catch (err) {
    console.log(err); 
    }
  }  

  export async function reset({token}) {
    try {
      const user = await User.findOne({ resetToken: token,
        expires: { $gt: Date.now() }
       }); 
      if (user === null) {
        return null; 
        } else {
          return user.resetToken; 
        } 
    } catch (err) {
      console.log(err); 
      }
  } 

  export async function doReset({password}, {token}) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ resetToken: token,
        expires: { $gt: Date.now() }  }); 
      if (user === null) {
        return null;
      } else {
          const updatedToken = undefined; 
          await User.updateOne(
            { username: user.username },
            {
              $set: {password: hashedPassword, resetToken: updatedToken, expires: undefined}
            }
          );
          const mailOpts = {
                from: "map@reset.com", 
                to: user.email,
                subject: 'Map site reset!',
                text: 'This is confirmation that your password has been reset'
              }; 
          return mailOpts;  
        } 
    } catch (err) {
        console.log(err); 
      }
  } 