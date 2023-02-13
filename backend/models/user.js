const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// validator
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

// static signup method
userSchema.statics.signup = async function(email, password) { // should be regular function to use this keyword.
  if (!email || !password) throw new Error('All fields must be filled')
  if (!validator.isEmail(email)) throw new Error('Invalid email');
  if (!validator.isStrongPassword(password)) throw new Error('Password is not strong enough');
  
  const userExists = await this.findOne({ email });
  if (userExists) throw new Error('Email already in use');

  const salt = await bcrypt.genSalt(10); // salt is a random string that is added to the password before hashing it. Optional.
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await this.create({ email, password: hashedPassword });

  return newUser;
}

// static login method
userSchema.statics.login = async function(email, password) {
  if (!email || !password) throw new Error('All fields must be filled')

  const user = await this.findOne({ email })
  if (!user) throw new Error('Incorrect email')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Incorrect password')

  return user
}

module.exports = mongoose.model('User', userSchema)
