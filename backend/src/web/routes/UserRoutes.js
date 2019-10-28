import UserController from '../controllers/UserController';

const express = require('express');
const router = express.Router();

router.get('/', UserController.getAll);
router.post('/', UserController.create);
router.put('/logIn', UserController.logIn);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.remove);
router.get('/:id', UserController.getOne);

module.exports = router;