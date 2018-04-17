//const MongoClient=require('mongodb').MongoClient;
const {MongoClient}=require('mongodb');
MongoClient.connect('mongodb://localhost:27017/toDoApp',(err,client)=>{
  if (err){
    return console.log('DB connection not successful');
  }
  console.log('connection successful');
//  console.log("db object:",db);
  const db=client.db('toDoApp');
  // db.collection('Todo').insertOne({
  //   text:'2nd insert',
  //   completed: false
  // },(err,result)=>{
  //   if (err){
  //     return console.log('insert failed',err);
  //   }
  //   console.log(JSON.stringify(result.ops));
  // });

  db.collection('users').insertOne({
    name:'sumanta',
    age:33,
    location:'Richmond'
  },(err,result)=>{
    if(err){
      return console.log("Insert failed in Users DB",err);
    }
    console.log(result.ops);
  });
  client.close();
});
