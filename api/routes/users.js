var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');


  const users = await db.user.findAll( {where: {id_tipouser:'2'}} ); // FIND ALL USERS
  
  /*
  const myUser  = await db.user.findOne({ where: { id: '1' } });
  const valid = await myUser.isCorrectPassword('123456');  
  res.send(valid);
  */

  res.send(JSON.stringify(users));
});

module.exports = router;
