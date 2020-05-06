var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.post('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var { ticket_pedido,id_user } = req.body;
  //const users = await db.user.findAll( {where: {id_tipouser:'2'}} ); // FIND ALL USERS
   
  if (id_user==0)  
      id_user=null;
  

  db.ticket.create({
    id_user:id_user,
    ticket_pedido:ticket_pedido
  }).then( async (ticket)=>{
      if (ticket)
      {

        var sTicket = await db.ticket.findAll({ where:{
                id:ticket.id
        },
        include:[{model:db.user,required:false,attributes:['nombre']}]
        })        
        var array = Object.values(sTicket);  
        // REBUILD TICKET
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
 
        res.status(200).send(JSON.stringify(newTickets));
            
      }
      else {
        obj = {
            message: 'Error al insertar en la base de datos'
        };
        res.status(400).send(JSON.stringify(obj));
      }
         
  })
  
});

module.exports = router;
