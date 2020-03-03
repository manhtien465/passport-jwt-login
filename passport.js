const passport =require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy=require('passport-local')   
const {JWT_SECRET}=require('./configuration/index')
const Users=require('./modal/users')
var jwtOptions = {};
var jwt = require('jsonwebtoken');
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("authorization");   //  Tên cần đúng như thế này
jwtOptions.secretOrKey =JWT_SECRET;
passport.use(new JwtStrategy(jwtOptions, async (payload,done)=>{
    console.log(payload.sub);
    
    Users.findOne({_id:payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}))
                                         //LOCAL STRETEGY
passport.use(new LocalStrategy({
    usernameField:'email'
},
    async (email,password,done)=>{
        try{
            const user=await Users.findOne({email})
            if(!user){
            return done(null,false)
            }
            const isMatch= await user.isValidPassword(password)
            if(!isMatch){
                return done(null,false)
            }
            done(null,user)
        }catch(error){
             done (error,false)
        }
    
    }
    ))