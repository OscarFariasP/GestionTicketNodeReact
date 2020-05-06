var express = require('express');
var router = express.Router();
var db = require('../models');
const jwt = require('jsonwebtoken');
const secret = 'secretsign';

/* GET users listing. */
router.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  //const users = await db.user.findAll();
    
  const { email, password } = req.body;
  var obj = {
    message:'Email no existe'
  }
  const resp = await  db.user.findOne({ where: { email: email } });

  if (resp===null)  
    res.status(401).send(JSON.stringify(obj))
  else {

    const valid = await resp.isCorrectPassword(password)
    if (valid){

        const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });    
          //console.log("token:",token);
        res.cookie('token', token, { httpOnly: true }).status(200).send(JSON.stringify(resp));
    }
    else {
        obj.message = 'Contraseña inválida';
        res.status(401).send(JSON.stringify(obj));
    }
    
  }  
  



  
});

module.exports = router;