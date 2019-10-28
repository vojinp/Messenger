import UserService from '../../services/UserService';
let jwt = require('jsonwebtoken');
let config = require('../../config');
// let middleware = require('./middleware');

class UserController {

	getAll(req, res) {
		UserService.getAll()
			.then((users) => {
				res.json(users);
			})
			.catch((err) => {
				throw(err);
			});
	}

	create(req, res) {
		const user = req.body;
		UserService.create(user)
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				throw(err);
			});
	}

	update(req, res) {
		const id = req.params.id;
		const user = req.body;
		UserService.update(id, user)
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				throw(err);
			});
	}

	remove(req, res) {
		const id  = req.params.id;
		UserService.remove(id)
			.then((user) => {
				res.json(user.id);
			})
			.catch((err) => {
				throw(err);
			});
	}

	getOne(req, res) {
		const id = req.params.id;
		UserService.getOne(id)
			.then((user) => {
				res.json(user);
			})
			.catch((err) => {
				throw(err);
			});
	}

	logIn(req, res) {
		const {username, password} = req.body;
		console.log(req.body)
		UserService.logIn(username, password)
			.then((user) => {
				let token = jwt.sign({username: user.username, id: user.id},
					config.secret,
					{ expiresIn: '24h' // expires in 24 hours
					}
				);
				// return the JWT token for the future API calls
				res.json({
					success: true,
					message: 'Authentication successful!',
					token: token
				});
			})
			.catch((err) => {
				res.status(404).send(err);
			});
	}
}

export default new UserController();