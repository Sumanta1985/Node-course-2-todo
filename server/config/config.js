const env=process.env.NODE_ENV || 'developement';

// if (env === 'developement'){
//   process.env.PORT =3000;
//   process.env.MONGODB_URI='mongodb://localhost:27017/todoapp';
// }else if (env === 'test'){
//   process.env.PORT =3000;
//   process.env.MONGODB_URI='mongodb://localhost:27017/todoapptest';
// }

if (env === 'developement' || env==="test"){
  var config= require('./config.json');
  var envconfig=config[env];

  Object.keys(envconfig).forEach((key)=>{
    console.log("key:",key);
    console.log("envconfig:",envconfig);
    process.env[key]=envconfig[key];
  })
}
