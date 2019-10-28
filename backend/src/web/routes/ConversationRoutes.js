import ConversationController from '../controllers/ConversationController';

const express = require('express');
const router = express.Router();

router.get('/', ConversationController.getAll);
router.post('/', ConversationController.create);
router.put('/:id', ConversationController.update);
router.delete('/:id', ConversationController.remove);
router.get('/:id', ConversationController.getOne);

module.exports = router;