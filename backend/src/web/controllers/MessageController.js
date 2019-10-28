import MessageService from '../../services/MessageService';

class MessageController {

	getAll(req, res) {
		MessageService.getAll()
			.then((messages) => {
				res.json(messages);
			})
			.catch((err) => {
				throw(err);
			});
	}

	create(req, res) {
		const message = req.body;
		MessageService.create(message)
			.then((message) => {
				res.json(message);
			})
			.catch((err) => {
				throw(err);
			});
	}

	update(req, res) {
		const id = req.params.id;
		const message = req.body;
		MessageService.update(id, message)
			.then((message) => {
				res.json(message);
			})
			.catch((err) => {
				throw(err);
			});
	}

	remove(req, res) {
		const id  = req.params.id;
		MessageService.remove(id)
			.then((message) => {
				res.json(message.id);
			})
			.catch((err) => {
				throw(err);
			});
	}

	getOne(req, res) {
		const id = req.params.id;
		MessageService.getOne(id)
			.then((message) => {
				res.json(message);
			})
			.catch((err) => {
				throw(err);
			});
	}
}

export default new MessageController();