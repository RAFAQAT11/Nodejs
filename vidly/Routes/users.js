const { User, validateUser } = require("../Models/user");
const Mongoose = require("mongoose");
const auth = require('../Middlewares/auth');
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const router = express.Router();


router.post('/me',auth,async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
