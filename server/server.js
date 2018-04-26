//const mongoose= require('mongoose');
const {ObjectId}=require('mongodb');
const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');

const {mongoose}=require('./db/mongoose.js');
const {User}=require('./models/user.js');
//const Todo=require('./models/todo.js').Todo;
const {Todo}=require('./models/todo.js');
const port=process.env.PORT || 3000;

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

app.post('/users',(req,res)=>{
  var user = new User({
    name:req.body.name,
    email:req.body.email
  });

  user.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});


app.get('/todos',(req,res)=>{
  // todo.find().then((todos)=>{    //Doesn't work
  // todo1.find().then((odos)=>{   //Doesn't work
  Todo.find().then((todos)=>{
    res.send({
      todos,
      status:res.status
    });
  }).catch((e)=>{
//    console.log("error",e);
    res.status(400).send(e);
  });
});

app.get('/todos/:id/:text/:completedAt',(req,res)=>{
  var id=req.params.id;
  var text=req.params.text;
  var completedAt=req.params.completedAt;

//testing purpose ,otherwise comment out
  // if (!ObjectId.isValid(id)){
  //   return res.status(404).send();
  // }

  Todo.findOne({completedAt:completedAt}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    // console.log('todo by completedAt',todo);
    res.send(todo);
  }).catch((err)=>{
    res.status(400).send(err);
  });

  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((err)=>{
    res.send();
  });
});

app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

app.patch('/todos/:id',(req,res)=>{
  const id=req.params.id;
  const body =_.pick(req.body,['text','completed']);
  console.log("body",req.body);
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo)=>{
    if (!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{res.status(400).send(e)});
});

app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});

module.exports={app};
