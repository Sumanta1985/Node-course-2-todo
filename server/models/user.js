const mongoose=require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcryptjs');

const JWT_secret=process.env.JWT_secret;

var UserSchema=new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    trim:true,
    minlength:1,
    default:null,
    unique:true,
    validate:{
      validator:(value)=>validator.isEmail(value),
      message:'{VALUE} is not a valid email id'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens:[{
    access:{
      type:String,
      required: true
    },
    token:{
      type:String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function(){
  var user=this;
  var userObject=user.toObject();

  return _.pick(userObject,['_id','email']);
}

UserSchema.methods.generateAuthToken = function(){
  var user=this;
  var access='auth';
  var token=jwt.sign({id: user._id.toHexString(),access:'auth'},JWT_secret).toString();

  user.tokens.push({access,token});
  // user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
}

UserSchema.methods.removeToken=function(token){
  var user=this;

  return user.update({
    $pull:{ // to delete
      tokens:{
        token: token
      }
    }
  });
}

UserSchema.statics.findByToken = function(token){  //not actually finding by token,verifying provided token and decode and use the id to match
  var User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,JWT_secret);
  }catch(e)
  {
    return new Promise((resolve,reject)=>{
      reject(e);
    });
  }
  console.log("token in user:  ",token);

  return User.findOne({
    '_id': decoded.id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.statics.findByCredentials=function(email,password){
    var User=this;

    return User.findOne({email}).then((user)=>{
      return new Promise((resolve,reject)=>{
        if(user){
          bcrypt.compare(password,user.password,(err,res)=>{
            if (res){
              resolve(user);
            }else{
              reject();
            }
          });
        }else{
          reject();
        }
      })
    });
}

UserSchema.pre('save',function(next){
  var user=this;

  if (user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
      });
    });
  }else{
    next();
  }
});

var User=mongoose.model('users',UserSchema);

module.exports={User};
