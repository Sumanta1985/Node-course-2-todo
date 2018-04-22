const mongoose=require('mongoose');

var Todo=mongoose.model('todo1',{
  text:{
    type:String,
    required:true,
    minlength:1
  },
  completed:{type:Boolean,dafault:false},
  completedAt:{type:Number,default:false}
});



module.exports={Todo};
