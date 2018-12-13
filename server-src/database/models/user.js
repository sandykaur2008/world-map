import mongoose from 'mongoose'; 
import bcrypt from 'bcryptjs';
mongoose.Promise = global.Promise; 

// Define userSchema
const userSchema = new mongoose.Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false }

}); 

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password); 
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10); 
	}
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED======='); 
		next(); 
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password); 
		next(); 
	}
}); 

export default mongoose.model('User', userSchema); 
