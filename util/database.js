require('dotenv').config();
const { MongoClient } = require("mongodb");
let _db;

const URI = process.env.DB_URI;

const mongoConnect = (callback) => { 
  MongoClient.connect(URI)
  .then(client => {
    console.log("connected");
    _db = client.db();
    callback();
  })
  .catch(error => console.log(error));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "no database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

