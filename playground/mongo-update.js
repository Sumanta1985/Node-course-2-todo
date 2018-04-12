const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp',(err,client)=>{
  if (err){
    return console.log('DB connection not successful');
  }
  console.log('connection successful');
//  console.log("db object:",db);
  const db=client.db('toDoApp');
  db.collection('users').findOneAndUpdate({
    name:'Alolika'
  },{$set:{name:'sontai'},$inc:{age:1}},{returnOriginal:false}).then((doc)=>{
    console.log('documents',doc);
  }).catch((err)=>{
    console.log('Error in finding in users DB');
  });
//  client.close();
});
