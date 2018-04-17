//const mongoose= require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');

const {mongoose}=require('./db/mongoose.js');
const {User}=require('./models/user.js');
//const Todo=require('./models/todo.js').Todo;
const {Todo}=require('./models/todo.js');

var app=express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

// app.post('/todos',(req,res)=>{
//   var todo = new Todo({
//     text:req.body.text
//   });
//
//   todo.save().then((doc)=>{
//     res.send(doc);
//   },(e)=>{
//     res.send(e);
//   });
// });


app.listen(3000,()=>{
  console.log('Started on port 3000');
});
