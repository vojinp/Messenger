import MessageController from '../controllers/MessageController';

const express = require('express');
const router = express.Router();

router.get('/', MessageController.getAll);
router.post('/', MessageController.create);
router.put('/:id', MessageController.update);
router.delete('/:id', MessageController.remove);
router.get('/:id', MessageController.getOne);

module.exports = router;