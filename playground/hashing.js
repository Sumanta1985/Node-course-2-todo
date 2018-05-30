const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');

console.log("I am Sumanta");
console.log(SHA256('I am Sumanta').toString());

var data={
  id: 10
}


var token=jwt.sign(data,'secret123');
console.log("Hash:",token);

var decoded=jwt.verify(token,'secret123');
console.log('decoded',decoded);
