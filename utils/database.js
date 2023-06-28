const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    'mongodb+srv://pfellow:f5jsJ4YK8IYWdtbI@cluster0.nrdbgre.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      _db = client.db('shop');
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
