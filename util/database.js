const { MongoClient } = require("mongodb");
let _db;

const URI = "mongodb+srv://toronto-guide:labs2020@cluster0-y2rr0.mongodb.net/TorontoGuide?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

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

