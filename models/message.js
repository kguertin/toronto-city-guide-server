const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    users: {
        type: [],
        require: true
    },
    messageHistory: {
        type: [],
        required: true
    }
})

module.exports = Message = mongoose.model("message", messageSchema);