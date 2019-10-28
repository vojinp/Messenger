import Message from '../models/Message';

class MessageRepository {
    getAll(callback, limit) {
        Message.find(callback).limit(limit).populate('sender', 'username').populate('reciever', 'username');
    }
    
    getOne(callback, id) {
        Message.findById(id, callback);
    }
    
    create(message, callback) {
        Message.create(message, callback);
    }
    
    update(id, message, options, callback) {
        const query = {_id: id};
        Message.findOneAndUpdate(query, message, options, callback);
    }
    
    remove(id, callback) {
        const query = {_id: id};
        Message.findOneAndRemove(query, callback);
    }
}

export default new MessageRepository();
