require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io')

const PORT = process.env.PORT;

const app = express();
const server =  http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

io.on("connection", socket => {
  console.log('connected');
  // socket.emit('connect', {hello: 'world'});
  // socket.on('response', data => {
  //     console.log(data);
  // })
  // socket.on('disconnect')
})

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const schedulerRoutes = require('./routes/schedule')

app.use('/auth', authRoutes);
app.use(userRoutes);
app.use('/api/schedules', schedulerRoutes);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  })