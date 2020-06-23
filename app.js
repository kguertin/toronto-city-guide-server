require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketio = require('socket.io');

const Message = require('./models/message');

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
  let currentRoom;

  socket.on('userData', async data =>{
    const {userId, contactId} = data;
    const messageData = await Message.find({users: userId});
    if (!messageData) {
      const newMessages = new Message({users: [userId, contactId], messages: []});
      currentRoom = await newMessages.save();
    }

    currentRoom = messageData.filter(i => {
      if (i.users.includes(userId) && i.users.includes(contactId)){
        return i;
      }
    }); 
  })

  socket.on('clientMessage', async message => {
    currentRoom.messages.push({
      sentById: req.user,
      test: message,
      timestamp: Date.now()
    })

    socket.join(currentRoom._id).emit(message)
  })
})

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const schedulerRoutes = require('./routes/schedule');

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