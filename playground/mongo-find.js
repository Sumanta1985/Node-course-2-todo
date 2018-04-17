const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/toDoApp',(err,client)=>{
  if (err){
    return console.log('DB connection not successful');
  }
  console.log('connection successful');
//  console.log("db object:",db);
  const db=client.db('toDoApp');
  db.collection('users').find({
    _id:new ObjectID('5acd61e4e2f51c34440a55a8')
  }).toArray().then((doc)=>{
    console.log('documents',doc);
  }).catch((err)=>{
    console.log('Error in finding in users DB');
  });
  client.close();
});
