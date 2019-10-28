import ConversationRepository from '../dal/repositories/ConversationRepository';
import UserService from './UserService';

class ConversationService {

	getAll(userId) {
        return new Promise((resolve, reject) => {  
            ConversationRepository.getAll(userId, (err, conversations) => {
                if (err) reject(err);
                resolve(conversations);
            });
        });
	}

	create(conversation) {
        return new Promise((resolve, reject) => {  
            ConversationRepository.create(conversation, (err, conversationResult) => {
                UserService.updateConversations(conversation.users, conversationResult.id).then(() => {
                    if (err) reject(err);
                    resolve(conversationResult);
                });
            });
        });
	}

	update(id, conversation) {
        return new Promise((resolve, reject) => {
            conversation.update_date = Date.now();
            ConversationRepository.update(id, conversation, {new: true}, (err, conversationResult) => {
                if (err) reject(err);
                resolve(conversationResult);
            });
        });
	}

	remove(id) {
        return new Promise((resolve, reject) => {
            ConversationRepository.remove(id, (err, conversationResult) => {
                if (err) reject(err);
                resolve(conversationResult);
            });
        });
	}

	getOne(id) {
        return new Promise((resolve, reject) => {
            ConversationRepository.getOne((err, conversation) => {
                if (err) reject(err);
                resolve(conversation);
            }, id);
        });
    }
    
    updateMessages(message) {
        return new Promise((resolve, reject) => {
            ConversationRepository.update(message.conversation,{ $push: { messages: message._id } }, {}, (err, user) => {
                if (err) reject(err);
                resolve();
            });
        });
	}
}

export default new ConversationService();