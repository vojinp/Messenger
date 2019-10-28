import MessageRepository from '../dal/repositories/MessageRepository';
import ConversationService from './ConversationService';

class MessageService {

	getAll() {
        return new Promise((resolve, reject) => {  
            MessageRepository.getAll((err, messages) => {
                if (err) reject(err);
                resolve(messages);
            });
        });
	}

	create(message) {
        return new Promise((resolve, reject) => {  
            MessageRepository.create(message, (err, messageResult) => {
                ConversationService.updateMessages(messageResult).then(() => {
                    if (err) reject(err);
                    resolve(messageResult);
                });
            });
        });
	}

	update(id, message) {
        return new Promise((resolve, reject) => {
            MessageRepository.update(id, message, {new: true}, (err, messageResult) => {
                if (err) reject(err);
                resolve(messageResult);
            });
        });
	}

	remove(id) {
        return new Promise((resolve, reject) => {
            MessageRepository.remove(id, (err, messageResult) => {
                if (err) reject(err);
                resolve(messageResult);
            });
        });
	}

	getOne(id) {
        return new Promise((resolve, reject) => {
            MessageRepository.getOne((err, message) => {
                if (err) reject(err);
                resolve(message);
            }, id);
        });
	}
}

export default new MessageService();