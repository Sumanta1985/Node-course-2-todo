const mongoose=require('mongoose');

var Todo=mongoose.model('todos',{
  text:{
    type:String,
    required:true,
    minlength:1,
    trim:true
  },
  completed:{
    type:Boolean,
    dafault:false
  },
  completedAt:{
    type:Number,
    default:null
  },
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});


module.exports={Todo};
