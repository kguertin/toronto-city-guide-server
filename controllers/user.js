const User = require('../models/user');
const Message = require('../models/message');

exports.getActiveUser = async (req, res) => {
    const user = await User.findById(req.user)
    //    await user.populate('schedule').execPopulate()
    console.log('user', user);
    res.json({
        username: user.username,
        id: user._id,
        contacts: user.contact,
        contactId: undefined,
        schedules: user.schedules,
        favourites: user.favourites
    })
}

exports.findUser = async (req, res) => {
    try {
        const { username } = req.body;
    
        const currentUser = await User.findById(req.user);
        if (currentUser.username === username) {
            res.status(400).json({ msg: 'Cant add yourself!' });
        }
    
        const isContact = currentUser.contact.find(i => {
            return i.username === username;
        })
    
        if (isContact) {
            return res.status(400).json({ msg: 'User already a contact' });
        }
    
        const findUser = await User.findOne({ username });

        if (!findUser) {
            return res.status(400).json({msg: 'That user does not exist'});
        }

        return res.json({username: user.username, id: user._id});

    } catch (err) {
        console.log(err)
    }
}

exports.addContact = (req, res) => {
    const { userData } = req.body;
    console.log(userData)
    User.findById(req.user)
        .then(user => {
            user.contact.push(userData);
            user.save();
        })
    // Person.updateOne({'_id': req.user}, {'contact': {userData}});
    // User.update({'_id': req.user}, { $set: {$push : {'contact': userData}}} )
    res.json({ userData })
}

exports.addFavourite = (req, res) => {
    const { place } = req.body;
    User.findById(req.user)
        .then(user => {
            user.favourites.push(place);
            user.save();
        })
    res.json({ place })
}

exports.getUserMessages = async (req, res) => {
    const { userId, contactId } = req.body
    const messageData = await Message.find();
    let messageHistory

    if (!messageData || messageData.length < 1) {
        const newMessages = new Message({ users: [userId, contactId], messages: [] });
        messageHistory = await newMessages.save();
        res.status(200).json({ messageHistory: messageHistory });
        return
    }
    
    messageHistory = messageData.filter(i => {
        if (i.users.includes(userId) && i.users.includes(contactId)) {
            return i;
        }
    });

    if (!messageHistory.length){
        const newMessages = new Message({ users: [userId, contactId], messages: [] });
        messageHistory = await newMessages.save();
    }
    
    res.status(200).json({ messageHistory: messageHistory[0] });
}

exports.updateUserMessages = async (req, res) => {
    try {
        const { newMessage, messagesId } = req.body

        const query = {_id: messagesId}
        const messages = await Message.findById(query)
        const newMessageHistory = [...messages.messageHistory, newMessage]
        messages.messageHistory = newMessageHistory
        messages.save();

    } catch (err) {
        console.log(err)
    }

}

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

exports.getFavourites = async (req, res) => {
    let favouritesData = await User.findById(req.user)
    favouritesData = favouritesData.favourites
    res.json({ favourites: favouritesData })
}


// // Cast to number failed for value "bar" at path "age"
// await Person.updateOne({}, { age: 'bar' });

// // Path `age` (-1) is less than minimum allowed value (0).
// await Person.updateOne({}, { age: -1 }, { runValidators: true });


// person.friends.push(friend);
// person.save(done);


// exports.addFriend = function (req, res, next) {
//     var friend = { "firstName": req.body.fName, "lastName": req.body.lName };
//     Users.findOneAndUpdate({ name: req.user.name }, { $push: { friends: friend } });
// };


// PersonModel.update(
//     { _id: person._id }, 
//     { $push: { friends: friend } },
//     done
// );