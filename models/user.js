const mongodb = require("mongodb");

const getDb = require("../util/database").getDb

class User { 
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  static findUser(username) {
    const db = getDb();
    return db.collection('users').findOne({username: username})
  }
}

module.exports = User;