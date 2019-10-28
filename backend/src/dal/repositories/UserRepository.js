import User from '../models/User';

class UserRepository {
    getAll(callback, limit) {
        User.find(callback).limit(limit).populate('conversations');
    }
    
    getOne(callback, id) {
        User.findById(id, callback);
    }
    
    create(user, callback) {
        User.create(user, callback);
    }
    
    update(id, user, options, callback) {
        const query = {_id: id};
        User.findOneAndUpdate(query, user, options, callback);
    }
    
    remove(id, callback) {
        const query = {_id: id};
        User.findOneAndRemove(query, callback);
    }

    logIn(username, password, callback) {
        const query = {username, password};
        User.findOne(query, callback);
    }
}

export default new UserRepository();
