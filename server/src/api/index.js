const express = require('express');

const pictures = require('./pictures');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/pictures', pictures);

module.exports = router;
