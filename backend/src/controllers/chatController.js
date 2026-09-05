const FAQ = require('../models/FAQ');
const Conversation = require('../models/Conversation');
const { v4: uuidv4 } = require('uuid');

// Simple text similarity function
const calculateSimilarity = (text1, text2) => {
  const words1 = text1.toLowerCase().split(/\W+/);
  const words2 = text2.toLowerCase().split(/\W+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  let commonWords = 0;
  set1.forEach(word => {
    if (set2.has(word)) commonWords++;
  });
  
  const similarity = (2 * commonWords) / (set1.size + set2.size);
  return similarity;
};

// @desc    Process chat message
// @route   POST /api/chat/message
// @access  Public
exports.processMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }
    
    // Get or create session
    let currentSessionId = sessionId || uuidv4();
    let conversation = await Conversation.findOne({ sessionId: currentSessionId });
    
    if (!conversation) {
      conversation = new Conversation({
        sessionId: currentSessionId,
        messages: []
      });
    }
    
    // Add user message to conversation
    conversation.messages.push({
      sender: 'user',
      text: message,
      timestamp: new Date()
    });
    
    // Find best matching FAQ
    const faqs = await FAQ.find({ isActive: true });
    let bestMatch = null;
    let bestScore = 0;
    
    for (const faq of faqs) {
      // Check question similarity
      const questionScore = calculateSimilarity(message, faq.question);
      
      // Check keyword matches
      let keywordScore = 0;
      if (faq.keywords && faq.keywords.length > 0) {
        faq.keywords.forEach(keyword => {
          if (message.toLowerCase().includes(keyword.toLowerCase())) {
            keywordScore += 0.3;
          }
        });
      }
      
      const totalScore = questionScore + keywordScore;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMatch = faq;
      }
    }
    
    let botResponse;
    
    if (bestMatch && bestScore > 0.3) {
      botResponse = bestMatch.answer;
    } else {
      botResponse = "I'm sorry, I couldn't find an answer to your question. Please try rephrasing it or contact support for assistance.";
    }
    
    // Add bot response to conversation
    conversation.messages.push({
      sender: 'bot',
      text: botResponse,
      timestamp: new Date()
    });
    
    await conversation.save();
    
    res.json({
      success: true,
      sessionId: currentSessionId,
      message: botResponse,
      confidence: bestScore,
      matchedFAQ: bestMatch ? bestMatch.question : null
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing message',
      error: error.message
    });
  }
};

// @desc    Get conversation history
// @route   GET /api/chat/history/:sessionId
// @access  Public
exports.getConversationHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const conversation = await Conversation.findOne({ sessionId });
    
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }
    
    res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching conversation',
      error: error.message
    });
  }
};