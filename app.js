require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoConnect = require("./util/database").mongoConnect

const PORT = process.env.PORT;

const app = express();
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'sessions'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(cors());

const authRoutes = require('./routes/auth');

app.use(authRoutes);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })
});