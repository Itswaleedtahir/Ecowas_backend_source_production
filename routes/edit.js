const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const client = require('scp2');

const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "public/profile");
  },
  filename: function (req, file, next) {
    let token = req.header("x-auth-token");
    let { id } = jwt.verify(token, process.env.jwtPrivateKey);

    next(null, "User" + id + ".png");
  },
});

const profile = multer({ storage });

router.put("/", profile.single("imgslug"), async (req, res) => {
  const { firstname, lastname, oldpass, newpass } = req.body;
  
  const token = req.header('x-auth-token');
  const { email, id } = jwt.verify(token, process.env.jwtPrivateKey);
  
  // Validate
  
  // Check if user is available
  let user = await users.findOne({ where: { email } });
  if (!user) return res.status(400).send('No such user exists.');
  
  const imgslug = req.file ? req.file.filename: user.imgslug;
  let hash = user.password;

  if (oldpass && newpass) {
    // Check old password
    let validPassword = await bcrypt.compare(oldpass, user.password);
    if(!validPassword) return res.status(400).send('Incorrect password.');

    // Set new password
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(newpass, salt);
  }

  if(req.file) {
    client.scp(`public/profile/${imgslug}`, {
      host: '213.150.196.36',
      username: 'ecosysb',
      password: '7Z1p-Z%Yj}WA',
      path: '/home/ecosysb/public_html/sankey/profile/'
    }, function(err) {
      if(err) console.log("Error uploading image to server");
    });
  }

  let updatedUser = await users.update(
    { 
      firstname: firstname ? firstname : user.firstname,
      lastname: lastname ? lastname: user.lastname,
      imgslug,
      password: (oldpass && newpass) ? hash : user.password
    },
    {
      where: { id },
      returning: true,
      plain: true,
    }
  );

  const newtoken = jwt.sign({ 
    id,
    firstname,
    lastname,
    email,
    imgslug
  }, process.env.jwtPrivateKey);

  return res.status(200).send({ message:"Profile updated successfully", token:newtoken });
});

module.exports = router;
