const mongoose=require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');

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
  var token=jwt.sign({id: user._id.toHexString(),access:'auth'},'secret123').toString();

  user.tokens.push({access,token});
  // user.tokens=user.tokens.concat([{access,token}]);
  return user.save().then(()=>{
    return token;
  });
}

var User=mongoose.model('users',UserSchema);

module.exports={User};
