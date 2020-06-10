const mongodb = require("mongodb");

const getDb = require("../util/database").getDb

class User { 
  constructor(username) {
    this.username = username;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
}

module.exports = User;