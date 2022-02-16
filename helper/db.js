 const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@cluster0-shard-00-02.nwsu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useMongoClient: true});
   
    mongoose.connection.on('open',() => {
        console.log('mongıdb bağlandı');
        console.log("s");
    });
    mongoose.connection.on('err',(err,data) => {
        console.log('ERR',err);
    });
    
    mongoose.Promise= global.Promise;
    
};

