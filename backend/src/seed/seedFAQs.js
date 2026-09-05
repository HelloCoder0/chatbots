const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FAQ = require('../model/FAQ');

dotenv.config();

const seedFAQs = [
  {
    question: "What are your business hours?",
    answer: "Our business hours are Monday through Friday, 9:00 AM to 6:00 PM EST. We are closed on weekends and major holidays.",
    keywords: ["hours", "open", "close", "time", "schedule"],
    category: "General"
  },
  {
    question: "How can I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
    keywords: ["password", "reset", "forgot", "login", "account"],
    category: "Account"
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team within 30 days of purchase for a full refund.",
    keywords: ["refund", "money back", "return", "policy"],
    category: "Billing"
  },
  {
    question: "Do you offer technical support?",
    answer: "Yes, we offer 24/7 technical support via email and live chat. Our average response time is under 2 hours.",
    keywords: ["support", "help", "technical", "assistance"],
    category: "Support"
  },
  {
    question: "How do I upgrade my plan?",
    answer: "You can upgrade your plan by going to Account Settings > Billing > Change Plan. Select your desired plan and the changes will take effect immediately.",
    keywords: ["upgrade", "plan", "billing", "change", "subscription"],
    category: "Billing"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot');
    console.log('Connected to MongoDB');

    // Clear existing FAQs
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');

    // Insert seed data
    const faqs = await FAQ.insertMany(seedFAQs);
    console.log(`Inserted ${faqs.length} FAQs`);

    mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();