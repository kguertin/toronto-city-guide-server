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

//Things users need 
// favourited/tagged places however we want to track map pins 
// some relation to chat, maybe an external library handles this?
// schedule 
//