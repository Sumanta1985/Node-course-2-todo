const {User}=require('./../models/user.js');

var authenticate=(req,res,next)=>{
  var token = req.header('x-auth');
// console.log("req:",req.user);
  User.findByToken(token).then((user)=>{
    if(!user){
      return new Promise((resole,reject)=>{
        reject("User not found");
      });
    }
    req.user=user;
    next();
  }).catch((e)=>{
    res.status(401).send(e);
  });
}

module.exports={authenticate};
