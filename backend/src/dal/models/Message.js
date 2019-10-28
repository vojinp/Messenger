const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: 'String',
        required: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    reciever: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    conversation: {
        type: mongoose.Schema.ObjectId,
        ref: 'Conversation'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
