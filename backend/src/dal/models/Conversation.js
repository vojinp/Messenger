const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Message'
    }],
    update_date: {
        type: Date,
        default: Date.now
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;
