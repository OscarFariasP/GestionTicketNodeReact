var express = require('express');
var router = express.Router();
var db = require('../models');

const jwt = require('jsonwebtoken');
const secret = 'secretsign';


/* GET users listing. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const token = req.cookies.token; 

  jwt.verify(token, secret, async(err, decoded)=>{
    if (err) {
      res.status(401).send('Unauthorized: Invalid token');
    } else {
      req.email = decoded.email;          
      let user = await db.user.findAll({        
          where: {
            email:req.email
          },        
        include:[{model:db.tipo_usuario,required:false,attributes:['nombre']}]
        })  
        res.send(JSON.stringify(user[0]));
    }}); 
     




});

module.exports = router;