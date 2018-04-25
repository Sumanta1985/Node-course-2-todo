const mongoose= require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect(process.end.MONGODB_URI || 'mongodb://localhost:27017/todoapp');

module.exports={mongoose};
