var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.delete('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var { id } = req.body;  
  var obj = {
      message:''
  }
  const ticket = await db.ticket.destroy( {where: {id:id}}).then((deleted)=>{
      if (deleted===1)
      {
        obj.message="sucess";
        res.status(200).send(JSON.stringify(obj));
      }
      else{
        obj.message="error al eliminar ticket";
        res.status(400).send(JSON.stringify(obj)); 
      }
  });
  
  
});

module.exports = router;