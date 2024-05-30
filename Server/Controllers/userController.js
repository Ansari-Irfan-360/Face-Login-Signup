const User = require("../Model/userModel");
const faceapi = require("face-api.js");
// const model=require('../models')

const Register = async (req, res) => {
    try {
      const name = req.body.name.toLowerCase(); // Convert provided name to lowercase
      const user = await User.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") } }); // Case-insensitive search
  
      if (user) {
        console.log("User already exists!");
        return res.status(409).json("User already exists!");
      } else {
        console.log("User not found. Proceed with registration.");
  
        await User.create({
          name: req.body.name,
          descriptor: req.body.descriptors,
        });
  
        console.log("User registered successfully.");
        return res.status(200).json("Registered Successfully");
      }
    } catch (e) {
      console.error("Error in registration:", e);
      return res.status(500).json("Internal Server Error");
    }
  };
  
const Login = async (req, res) => {
  try {
    if (!req.body.email) {
      const users = await User.find();
      for (let i = 0; i < users.length; i++) {
        const distanceThreshold = 0.4; // Adjust as needed
        const descriptor1 = users[i].descriptor,
          descriptor2 = req.body.descriptors;

        const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
        if (distance <= distanceThreshold) {
          return res.status(200).json({ user: users[i] });
        }
      }
      return res.status(401).json("User not found!");
    } else {
      const Email = req.body.email.toLowerCase();
      let user = await User.findOne({ email: Email });
      if (!user) return res.status(404).json("No User with this email !");

      const distanceThreshold = 0.4; // Adjust as needed
      const descriptor1 = user.descriptor,
        descriptor2 = req.body.descriptors;

      const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
      if (distance <= distanceThreshold) {
        res.status(200).json({ user });
      } else {
        return res.status(401).json("Authentication failed !");
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { Register, Login };
