const bcrypt = require('bcrypt');
const user = require('../models/user')
const{createToken} = require('../services/auth')


async function handleSignup(req, res) {
    const { firstname, lastname, email, password } = req.body
    
    const isuser = await user.findOne({ email })
    if (isuser) {
        return res.status(400).json({message:"user already exists"})
    }
    else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(400).json({message:"error creating user"})
        } else {
          user.create({ firstname, lastname, email, password: hash })
        }
      });
    }
    return res.status(200).json({message:"user created successfully"})
}
  
  async function handleLogin(req, res) {
    const { email, password } = req.body
    const User = await user.findOne({ email })
    if (!User) {
        return res.status(400).json({message:"user not found"})
    }
    else {
      bcrypt.compare(password, User.password, (err, isMatch) => {
        if (err) {
            return res.status(400).json({message:"error matching password"})
        } else if (isMatch) {
          const token = createToken(User)
          return res.status(200).json({status:"success",token:token})
        } else {
            return res.status(400).json({message:"incorrect password"})
        }
      });
    }
  
  }
  module.exports ={
    handleLogin,handleSignup
  }