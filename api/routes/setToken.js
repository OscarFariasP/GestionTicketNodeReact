var express = require('express');
var router = express.Router();
var db = require('../models');
const jwt = require('jsonwebtoken');
const secret = 'secretsign';

/* GET users listing. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
var email = "admin@example.com";
        const payload = {email};
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });    
          //console.log("token:",token);
        res.cookie('token', token, { httpOnly: true }).status(200).send("token sucess");


  
});

module.exports = router;