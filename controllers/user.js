const User = require('../models/user');
const Message = require('../models/message');

exports.getActiveUser = async (req, res) => {
    try {
        const user = await User.findById(req.user)
        if(!user){
            const error = new Error('Could not find active user.')
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({
            username: user.username,
            id: user._id,
            contacts: user.contact,
            contactId: undefined,
            schedules: user.schedules,
            favourites: user.favourites
        })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
          next(err);
    }
}

exports.findUser = async (req, res) => {
    try {
        const { username } = req.body;
    
        const currentUser = await User.findById(req.user);
        if(!currentUser){
            const error = new Error('Could not find that user.')
            error.statusCode = 400;
            throw error;
        }

        if (currentUser.username === username) {
            const error = new Error('You cannot add yourself as a contact.')
            error.statusCode = 400;
            throw error;
        }
    
        const isContact = currentUser.contact.find(i => {
            return i.username === username;
        })
    
        if (isContact) {
            const error = new Error('User is already a contact.')
            error.statusCode = 400;
            throw error;
        }
    
        const newContact = await User.findOne({ username });

        if (!newContact) {
            const error = new Error('That user does not exist')
            error.statusCode = 400;
            throw error;
        }

        res.status(200).json({username: newContact.username, id: newContact._id});

    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.addContact = async (req, res) => {
    try {
        const { userData } = req.body;
    
        const findUser = await User.findById(req.user);
        if(!findUser){
            const error = new Error('Could not find that user.')
            error.statusCode = 400;
            throw error;
        }

        const includesUser = findUser.contact.find(i => i.username === userData.username);
        
        if (includesUser) {
            const error = new Error('That contact has already been added.')
            error.statusCode = 400;
            throw error;
        }

        findUser.contact.push(userData);
        findUser.save();

        res.status(201).json({ userData })
        
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.removeContact = async (req, res) => {
    try {
        const { contactId } = req.body;

        const userData = await User.findById(req.user);
        if(!userData){
            const error = new Error('Could not find that user.')
            error.statusCode = 400;
            throw error;
        }

        const newContacts = userData.contact.filter(i => i.id !== contactId);
        userData.contact = newContacts;
        await userData.save();

        res.status(200).json({msg: 'contact deleted', newContacts});
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.addFavourite = async (req, res) => {
    try {
    const { place } = req.body;

    const user = await User.findById(req.user)
    if(!user){
        const error = new Error('Could not find user.')
        error.statusCode = 400;
        throw error;
    }

    user.favourites.push(place);
    await user.save();
    res.status(201).json({ place })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.removeFavourite = async (req, res) => {
    try {
        const { place } = req.body;
        const user = await User.findById(req.user)
        if(!user){
            const error = new Error('Could not find user.')
            error.statusCode = 400;
            throw error;
        }

        user.favourites = user.favourites.filter(fave => fave.name != place[1])
        const favouritesData = await user.save(); 

        res.status(200).json({ favouritesData })
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.getUserMessages = async (req, res) => {
    try {

    const { userId, contactId } = req.body
    const messageData = await Message.find();
    let messageHistory

    if (!messageData || messageData.length < 1) {
        const newMessages = new Message({ users: [userId, contactId], messages: [] });
        messageHistory = await newMessages.save();
        res.status(200).json({ messageHistory: messageHistory });
        return
    }
    
    const messageFilter = messageData.filter(i => {
        if (i.users.includes(userId) && i.users.includes(contactId)) {
            return i;
        }
    });

    if (!messageFilter.length){
        const newMessages = new Message({ users: [userId, contactId], messages: [] });
        messageHistory = await newMessages.save();
    }

    if (messageFilter.length){
        messageHistory = messageFilter[0]
    }

    res.status(200).json({ messageHistory: messageHistory });
    
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}

exports.updateUserMessages = async (req, res) => {
    try {
        const { newMessage, messagesId } = req.body

        const query = {_id: messagesId}
        const messages = await Message.findById(query);
        const newMessageHistory = [...messages.messageHistory, newMessage];
        messages.messageHistory = newMessageHistory;
        const savedMessages = await messages.save();

        res.status(200).json({ savedMessages: savedMessages });

    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }

}

exports.getFavourites = async (req, res) => {
    try{
        const user = await User.findById(req.user);
        if(!user){
            const error = new Error('can not find user favourites.');
            error.statusCode = 400;
            throw error;
        }

        favouritesData = user.favourites;
        res.status(200).json({ favourites: favouritesData });
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
          }
        next(err);
    }
}