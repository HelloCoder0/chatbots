const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    unique: true
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true
  },
  keywords: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
faqSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Text index for search
faqSchema.index({ 
  question: 'text', 
  answer: 'text', 
  keywords: 'text' 
});

module.exports = mongoose.model('FAQ', faqSchema);