import UserRepository from '../dal/repositories/UserRepository';

class UserService {

	getAll() {
        return new Promise((resolve, reject) => {  
            UserRepository.getAll((err, users) => {
                if (err) reject(err);
                resolve(users);
            });
        });
	}

	create(user) {
        return new Promise((resolve, reject) => {  
            UserRepository.create(user, (err, userResult) => {
                if (err) reject(err);
                resolve(userResult);
            });
        });
	}

	update(id, user) {
        return new Promise((resolve, reject) => {
            UserRepository.update(id, user, {new: true}, (err, userResult) => {
                if (err) reject(err);
                resolve(userResult);
            });
        });
	}

	remove(id) {
        return new Promise((resolve, reject) => {
            UserRepository.remove(id, (err, userResult) => {
                if (err) reject(err);
                resolve(userResult);
            });
        });
	}

	getOne(id) {
        return new Promise((resolve, reject) => {
            UserRepository.getOne((err, user) => {
                if (err) reject(err);
                resolve(user);
            }, id);
        });
    }
    
    updateConversations(users, conversationId) {
        return new Promise((resolve, reject) => {
            UserRepository.update(users[0],{ $push: { conversations: conversationId } }, {}, (err, user) => {
                if (err) reject(err);
                UserRepository.update(users[1],{ $push: { conversations: conversationId } }, {}, (err, user) => {
                    if (err) reject(err);
                    resolve();
                });
            });
        });
    }
    
    logIn(username, password) {
        return new Promise((resolve, reject) => {
            UserRepository.logIn(username, password, (err,user) => {
                if (err) reject(err);
                if (!user) reject('User not found!')
                resolve(user);
            })
        });
	}
}

export default new UserService();