import User from '../database/models/user'; 
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


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