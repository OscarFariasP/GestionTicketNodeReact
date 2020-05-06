
const jwt = require('jsonwebtoken');
const secret = 'secretsign';
var db = require('../models');
const withAuth = async(req, res, next) => {

  res.setHeader('Content-Type', 'application/json');  

  
  
  const adminList = ['admin','editarTicket'];
  const userList = ['home'];


  const token = req.cookies.token;  
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
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
      }); 
       var Rol = user[0].tipo_usuario.nombre;
      // VALIDAR RUTAS DE USUARIO SEGUN SU ROL
      var { route } = req.body;
      
       if (Rol==='Administrador')
       {

          var isValid = false;
          for (var i=0;i<adminList.length;i++)
          {  
            console.log(adminList[i])
            if (route.includes(adminList[i]))
            {
              isValid = true;
              break;
            }

          }

          if (isValid){            
            next();                      
          }                      
          else          
            res.status(201).send(JSON.stringify({route:'/admin'})); // REDIRECT TO DEFAULT
          

          
       }
       else if (Rol==='Usuario')
       {
          var isValid = false;
          for (var i=0;i<userList.length;i++)
          {
            if (route.includes(userList[i]))
            {
              isValid = true;
              break;
            }

          }
          if (isValid){            
            next();                      
          }            
          else          
          res.status(201).send(JSON.stringify({route:'/home'})); // REDIRECT TO DEFAULT
       }
       else 
       {
        res.status(401).send('Unauthorized: NO TIENE ROL DEFINIDO');
       }

       


        

        
      }
    });
  }

}
module.exports = withAuth;
