const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    users: {
        type: [],
        require: true
    },
    messages: {
        type: [],
        required: true
    }
})

module.exports = Message = mongoose.model("message", messageSchema);