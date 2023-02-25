const express = require("express")
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require("./../models/userModel")
const verify_log_in = require("./../middleware/verify_log_in")

// token sign function
const signToken = (id, biz) => {
  return jwt.sign({ id, biz }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// this sets the cookie and gives its expirey
const cookieOptions = {
  expires: new Date(Date.now()+10*24*60*60*1000),
  httpOnly:true
}


/*
* POST http://localhost:3000/api/users/register
*/
router.post("/register", async(req,res)=>{
  try{
    const newUser = await User.create(req.body);

    const {name, email, _id} = newUser;

    res.status(200).json({
      status:"success",
      data:{name,email,_id},
      message:"user has been registered !"
    })

  }catch(err){
   res.status(400).json({
      status:"fail",
      message: err.message
    })
  }
})

/*
* POST http://localhost:3000/api/users/login
*/
router.post("/login", async(req,res)=>{
try{
  const { email, password } = req.body;

  if(!email || !password){
    return res.status(400).json({status:"no email or password found"});
}

const user = await User.findOne({ email }).select('+password');

if(!user || !(await bcrypt.compare(password, user.password))){
  return res.status(400).json({status:"email or password is invalid"});
}

const token = signToken(user._id, user.biz);

if(!token){
  return res.status(400).json({status:"problem with auth, sign in again"});
  }

  res.cookie("jwt",token,cookieOptions)

res.status(200).json({
  status: "success",
  token: token
})

}catch(err){
res.status(400).json({
      status:"fail",
      message: err.message
    })
}
})

/*
* GET http://localhost:3000/api/users/myUser
*/
router.get("/myUser",verify_log_in, async(req,res)=>{
   try{
    const decoded = req.user
    const currentUser = await User.findById(decoded.id).select("-password")

    res.status(200).json({
      status:"success",
      'user details':currentUser
    })

  }catch(err){
   res.status(400).json({
      status:"fail",
      message: err.message
    })
  }

})





module.exports = router;