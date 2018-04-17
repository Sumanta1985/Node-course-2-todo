const mongoose=require('mongoose');

var User=mongoose.model('user',{
  name:{
    type:String,
  },
  email:{
    type:String,
    trim:true,
    minlength:1,
    default:null
  }
});


module.exports={User};
