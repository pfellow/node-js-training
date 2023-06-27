const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (cb) => {
  MongoClient.connect(
    'mongodb+srv://pfellow:f5jsJ4YK8IYWdtbI@cluster0.nrdbgre.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      cb(client);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
