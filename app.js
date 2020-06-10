const express = require("express");
const User = require("./models/user");
const mongoConnect = require("./util/database").mongoConnect
const app = express();

app.get("/", (req, res) => {
  const user = new User("Bart") 
  user.save()
  .then(() => console.log("saved"));
})

mongoConnect(() => app.listen(8008, () => console.log("Listening on PORT 8008")));