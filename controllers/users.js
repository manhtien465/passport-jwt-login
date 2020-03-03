const User =require("../modal/users")
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration');
signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
}
module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
     
     
    // Check if there is a user with the same email
    let foundUser = await User.findOne({ "email": email });
    if (foundUser) { 
      return res.status(403).json({ error: 'Email is already in use'});
    }
     newUsers= new User({
      email,password
    })
     newUsers.save()
     const token = signToken(newUsers)
     res.status(200).json({token})
  },signIn:async(req,res,next)=>{ 
      console.log(req.user);
       const token=signToken(req.user)
       res.status(200).json({token})
  },

  secret: async (req,res,next)=>{
    console.log("daynayfqwertrytuytrereretryty");
    res.json({messs:"sudfbig"})
  }

}