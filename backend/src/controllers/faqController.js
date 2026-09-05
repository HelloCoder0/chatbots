const FAQ = require('../model/FAQ');

// @desc    Get all FAQs
// @route   GET /api/faqs
// @access  Public
exports.getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find({ isActive: true })
      .sort({ category: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQs',
      error: error.message
    });
  }
};

// @desc    Get single FAQ
// @route   GET /api/faqs/:id
// @access  Public
exports.getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    
    res.json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching FAQ',
      error: error.message
    });
  }
};

// @desc    Create FAQ
// @route   POST /api/faqs
// @access  Public (will add auth later)
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;
    
    const faq = await FAQ.create({
      question,
      answer,
      keywords: keywords || [],
      category: category || 'General'
    });
    
    res.status(201).json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating FAQ',
      error: error.message
    });
  }
};

// @desc    Update FAQ
// @route   PUT /api/faqs/:id
// @access  Public (will add auth later)
exports.updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    
    res.json({
      success: true,
      data: faq
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating FAQ',
      error: error.message
    });
  }
};

// @desc    Delete FAQ
// @route   DELETE /api/faqs/:id
// @access  Public (will add auth later)
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    
    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found'
      });
    }
    
    res.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting FAQ',
      error: error.message
    });
  }
};

// @desc    Search FAQs
// @route   GET /api/faqs/search?q=keyword
// @access  Public
exports.searchFAQs = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    const faqs = await FAQ.find({
      $or: [
        { question: { $regex: q, $options: 'i' } },
        { answer: { $regex: q, $options: 'i' } },
        { keywords: { $regex: q, $options: 'i' } }
      ],
      isActive: true
    }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: faqs.length,
      data: faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching FAQs',
      error: error.message
    });
  }
};