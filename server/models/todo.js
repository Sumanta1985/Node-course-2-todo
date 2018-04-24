const mongoose=require('mongoose');

var Todo=mongoose.model('todos',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{type:Boolean,dafault:false},
  completedAt:{type:Number,default:null}
});



module.exports={Todo};
