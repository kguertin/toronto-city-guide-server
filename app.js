const express = require("express");

const mongoConnect = require("./util/database").mongoConnect
const User = require("./models/user");

const app = express();
const PORT = 3000

const authRoutes = require('./routes/auth');

app.use(authRoutes);

app.use("/", (req, res, next) => {
  const user = new User("Bart")
  user.save()
    .then(() => {
      console.log("saved");
      res.send('ok');
      });
})

mongoConnect(() => app.listen(PORT, () => console.log(`Listening on port ${PORT}`)));