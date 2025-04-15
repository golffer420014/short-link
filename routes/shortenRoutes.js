const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/shortenController');

router.get('/', (req, res) => {
  res.send('Hello World shorten url 3.42');
});


// POST /shorten - สร้าง short URL
router.post('/shorten', shortenUrl);

// GET /:code - redirect ไปยัง original URL
router.get('/:code', redirectUrl);

module.exports = router;
