
var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.clearCookie("token");
  res.sendStatus(200);
});

module.exports = router;