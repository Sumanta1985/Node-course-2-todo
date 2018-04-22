const mongoose=require('mongoose');

var User=mongoose.model('user1',{
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
