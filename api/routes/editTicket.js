var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.put('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var { id,ticket_pedido } = req.body;   
  
  db.ticket.update(
    {ticket_pedido: ticket_pedido},
    {where: {id:id} }).then(function(x){
        var obj = {
            message:'sucess'
        }
        if (x){ 
          res.status(200).send(JSON.stringify(obj));
        }
        else{
          obj.message = 'Ha ocurrido un error al editar';
          res.status(400).send(JSON.stringify(obj));
        }

    });


  
});

module.exports = router;
