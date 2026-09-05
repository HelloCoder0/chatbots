const express = require('express');
const router = express.Router();
const {
  getFAQs,
  getFAQ,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  searchFAQs
} = require('../controllers/faqController');

router.route('/')
  .get(getFAQs)
  .post(createFAQ);

router.route('/search')
  .get(searchFAQs);

router.route('/:id')
  .get(getFAQ)
  .put(updateFAQ)
  .delete(deleteFAQ);

module.exports = router;