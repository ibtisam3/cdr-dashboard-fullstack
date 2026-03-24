const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./user');
const tokenCheck = require('./tokenCheck');

// Signup
router.post('/signup', async (req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({message:'User exists'});

    const hashed = await bcrypt.hash(password,10);
    const newUser = new User({name,email,password:hashed,role});
    await newUser.save();
    res.status(201).json({message:'User created'});
  } catch(err){
    res.status(500).json({message:'Server error'});
  }
});

// Login
router.post('/login', async(req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message:'User not found'});

    const match = await bcrypt.compare(password,user.password);
    if(!match) return res.status(400).json({message:'Invalid credentials'});

    const token = jwt.sign({id:user._id,role:user.role}, process.env.JWT_SECRET, {expiresIn:'1h'});
    res.json({token,user:{name:user.name,email:user.email,role:user.role}});
  }catch(err){
    res.status(500).json({message:'Server error'});
  }
});

module.exports = router;