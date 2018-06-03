const {Todo}=require("./../../models/todo");
const {User}=require("./../../models/user");
const {ObjectId}=require("mongodb");
const jwt=require('jsonwebtoken');

var todooneId=new ObjectId();
var todotwoId=new ObjectId();
var useroneId=new ObjectId();
var usertwoId=new ObjectId();

const todos=[{
  _id: todooneId,
  text: 'first',
  _creator:useroneId
},{
  _id: todotwoId,
  text: 'second',
  completed: true,
  completedAt: 222,
  _creator:usertwoId
}];

const users=[{
  _id: useroneId,
  name: 'sumanta',
  email:'bardhan.sumanta@gmail.com',
  password:'123abc',
  tokens:[{
    access:'auth',
    token:jwt.sign({id: useroneId.toHexString(),access:'auth'},'secret123').toString()
  }]
},{
  id: usertwoId,
  name: 'Alu',
  email:'dutta.alolika@gmail.com',
  password:'123abcd'
  // tokens:[{
  //   access:'auth',
  //   token:jwt.sign({id: usertwoId.toHexString(),access:'auth'},'secret123').toString();
  // }]
}];

var populateTodos=(done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
//    done();
  }).then(()=>{
    done();
  });
};

var populateUsers=(done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();  //to call 'pre' middleware
    // .then(()=>{
    //   return
    // });
    var userTwo = new User(users[1]).save();
//    return User.insertMany(users);
//    done();
    return Promise.all([userOne,userTwo]);
  }).then(()=>{
    done();
  });
};

module.exports={todos,populateTodos,users,populateUsers}
