const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: "./config/.env" });
//gettoken
/*const getToken =  async (user) => {
    
    const payload =
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }
      try{
      const token = await jwt.sign(payload, process.env.secretOrKey);

      res.status(200).send({ msg: "user saved",user,token});
    
    }catch (error) {
        
      }
    }*/
    const getToken = (user) => {
      return jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.secretOrKey,
        {
          expiresIn: '48h',
        }
      );
    };


//isAuth
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).send({ msg: "Unauthorized" });
    }

    const decoded = await jwt.verify(token, process.env.secretOrKey);
    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(400).send({ msg: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send({ msg: "Unauthorized" });
  }
};
  
//isAdmin
const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user && req.user.isAdmin) {
      return next();
    }
    return res.status(401).send({ message: 'Admin Token is not valid.' });
  };
  
  module.exports= { getToken, isAuth, isAdmin };
