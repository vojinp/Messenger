import ConversationService from '../../services/ConversationService';

class ConversationController {

	getAll(req, res) {
		const user = req.decoded;
		ConversationService.getAll(user.id)
			.then((conversations) => {
				res.json(conversations);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	create(req, res) {
        const conversation = req.body;
		ConversationService.create(conversation)
			.then((conversation) => {
				res.json(conversation);
			})
			.catch((err) => {
				throw(err);
			});
	}

	update(req, res) {
		const id = req.params.id;
		const conversation = req.body;
		ConversationService.update(id, conversation)
			.then((conversation) => {
				res.json(conversation);
			})
			.catch((err) => {
				throw(err);
			});
	}

	remove(req, res) {
		const id  = req.params.id;
		ConversationService.remove(id)
			.then((conversation) => {
				res.json(conversation.id);
			})
			.catch((err) => {
				throw(err);
			});
	}

	getOne(req, res) {
		const id = req.params.id;
		ConversationService.getOne(id)
			.then((conversation) => {
				res.json(conversation);
			})
			.catch((err) => {
				throw(err);
			});
	}
}

export default new ConversationController();