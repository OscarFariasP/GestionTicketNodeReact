var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var tickets = await db.ticket.findAll({
      include:[{model:db.user,required:false,attributes:['nombre']}]
  }); // ALL TICKETS    
  var array = Object.values(tickets);  
  // REBUILD TICKETS
  var newTickets = [];  
  array.forEach(i => {      

    var nomb = "";        
    if (i.id_user===null){
        nomb = "no asignado"
    }
    else {
        nomb = i.user.nombre; 
    }      
    newTickets.push({
        id:i.id,
        nombre:nomb,
        ticket_pedido:i.ticket_pedido,
    })


      
  });

  res.send(JSON.stringify(newTickets));
});

module.exports = router;
