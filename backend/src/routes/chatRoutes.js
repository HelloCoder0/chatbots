const express = require('express');
const router = express.Router();
const {
  processMessage,
  getConversationHistory
} = require('../controllers/chatController');

router.post('/message', processMessage);
router.get('/history/:sessionId', getConversationHistory);

module.exports = router;