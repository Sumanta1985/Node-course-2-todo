const {ObjectID}=require('mongodb');

const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');

var todo_id='5adcda4850c10a24fa13f2ea1';
var user_id='5ad01a4608702207f69a956f';

Todo.find({"text" : "test todo text"}).then((todos)=>{
  console.log('todos',todos);
});

// Todo.findOne({_id:'5adce7c3b70b542632da062a'}).then((todos)=>{
//   console.log('todos',todos);
// });

// Todo.findOne({_id:id}).then((todo)=>{
//   console.log('todo',todo);
// });

if (!ObjectID.isValid(todo_id)){
  console.log('onject id invalid');
}

Todo.findById(todo_id).then((todo)=>{
  console.log('todo by id',todo);
}).catch((err)=>{
  console.log('todo error',err);
});

User.findById(user_id).then((user)=>{
  console.log('user',user);
  if (!user){
    return console.log("user not found");
  }

}).catch((err)=>{
  console.log('user error',err);
});
