require('./config/config.js');
//const mongoose= require('mongoose');

//const {ObjectId}=require('mongodb');
const express=require('express');
const bodyParser=require('body-parser');
const _=require('lodash');

const {mongoose}=require('./db/mongoose.js');
const {User}=require('./models/user.js');
//const Todo=require('./models/todo.js').Todo;
const {Todo}=require('./models/todo.js');
const {authenticate}=require('./middleware/middleware.js');

const PORT=process.env.PORT;

var app=express();

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{
  var todo = new Todo({
    text:req.body.text,
    _creator:req.user._id
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  // todo.find().then((todos)=>{    //Doesn't work because find() is a model function.
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

app.delete('/todos/:id',authenticate,(req,res)=>{
  var _id=req.params.id;
  var _creator=req.user._id;
  // Todo.findByIdAndRemove(id).then((todo)=>{
  Todo.findOneAndRemove({_id,_creator}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((err)=>{
    res.status(400).send(err);
  });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
  const _id=req.params.id;
  var _creator=req.user._id;
  const body =_.pick(req.body,['text','completed']);
  console.log("body",req.body);
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
//  Todo.findByIdAndUpdate(id,{$set:body},{new: true}).then((todo)=>{
  Todo.findByIdAndUpdate({_id,_creator},{$set:body},{new: true}).then((todo)=>{
    if (!todo){
      return res.status(404).send();
    }
    res.send(todo);
  }).catch((e)=>{res.status(400).send(e)});
});

app.post('/users',(req,res)=>{
  var body=_.pick(req.body,['name','email','password']);
  var user = new User(body);
  console.log("user",user);
  user.save().then(()=>{
    //token and has of passowrd
    //res.send(doc);
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user);
  }).catch((e)=>{
    console.log('error',e);
    res.status(400).send(e);
  });
});

app.post('/users/login',(req,res)=>{
  var body=_.pick(req.body,['email','password']);

  User.findByCredentials(body.email,body.password).then((user)=>{
    return user.generateAuthToken().then((token)=>{
      res.header('x-auth',token).send(user);
    });
  }).catch((e)=>{
    res.status(400).send(e);
  });
  // res.send(body);
});

app.get('/users/me',authenticate,(req,res)=>{
  res.send(req.user);
});

app.delete('/users/me/token',authenticate,(req,res)=>{
  req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
  }).catch((e)=>{
    res.status(401).send();
  });
});

app.listen(PORT,()=>{
  console.log(`Started on port ${PORT}`);
});

module.exports={app};
