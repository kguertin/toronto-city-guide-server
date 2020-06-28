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
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors());

io.on("connection", socket => {
  let roomId;
  console.log('connected');
  

  socket.on('joinroom', data => {
    roomId = data.id
    socket.join(roomId);
    console.log(io.sockets.adapter.rooms[roomId])
  }); 
  
  socket.on('update', async data => {
    console.log(data)
    console.log(io.sockets.adapter.rooms[roomId])
    const {senderId, messages} = data;
      const sendTo = messages.users.filter(i => i !== senderId)[0];
      socket.to(sendTo).emit('newMessage', data.newMessage)
  });
  
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  })

// let nsp = io.of(`/${roomId}`);
// nsp.on('connection', socket => {
//   console.log(`someone connected to ${roomId}`);
//   nsp.emit('hi', 'everyone!');
// });

// socket.on('userData', async data =>{
//   const {userId, contactId} = data;
//   const messageData = await Message.find();

//   if (!messageData || messageData.length < 1 ) {
//     const newMessages = new Message({users: [userId, contactId], messages: []});
//     const savedMessages = await newMessages.save();
//     socket.emit('roomData', savedMessages);
//     return 
//   }

//   const currentRoom = messageData.filter(i => {
//     if (i.users.includes(userId) && i.users.includes(contactId)){
//       return i;
//     }
//   }); 
//   socket.emit('roomData', currentRoom[0]);
// });

//   socket.on('clientMessage', data => {
//     const newData = data;
//     const newHistory = data.messages.messageHistory;
//     newHistory.push({
//       text: data.message,
//       senderId: data.userId,
//       timeStamp: Date.now()
//     });
//     newData.messages = {...newData.messages, messageHistory: newHistory};

//     const query = {_id: data.messages._id}
//     Message.findByIdAndUpdate(query, {messageHistory: newHistory})
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
//     // socket.join(data.messages._id)
//     // socket.to(roomId).emit('serverMessage', newData)
//     socket.emit('serverMessage', newData);

//   })

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const schedulerRoutes = require('./routes/schedule');
const { on } = require('process');

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