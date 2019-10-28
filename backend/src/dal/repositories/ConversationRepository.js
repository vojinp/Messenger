import Conversation from '../models/Conversation';

class ConversationRepository {
    getAll(userId, callback, limit) {
        const query = { users: userId}
        Conversation.find(query, callback).limit(limit).populate('messages').populate('users', 'username');
    }
    
    getOne(callback, id) {
        Conversation.findById(id, callback);
    }
    
    create(conversation, callback) {
        Conversation.create(conversation, callback);
    }
    
    update(id, conversation, options, callback) {
        const query = {_id: id};
        Conversation.findOneAndUpdate(query, conversation, options, callback);
    }
    
    remove(id, callback) {
        const query = {_id: id};
        Conversation.findOneAndRemove(query, callback);
    }
}

export default new ConversationRepository();
