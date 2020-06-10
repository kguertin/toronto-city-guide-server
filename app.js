const express = require("express");

const mongoConnect = require("./util/database").mongoConnect
const User = require("./models/user");

const app = express();

app.get("/", (req, res) => {
  const user = new User("Bart") 
  user.save()
  .then(() => console.log("saved"));
})

mongoConnect(() => app.listen(8008, () => console.log("Listening on PORT 8008")));