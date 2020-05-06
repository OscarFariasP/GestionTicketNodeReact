'use strict';
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
   // timestamps: false,
    id_tipouser:DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,    
  }, {
    tableName:'user'
  }  
  );
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.tipo_usuario,{
      through:'id',
      foreignKey:'id_tipouser'
    })
    
  };
  user.prototype.isCorrectPassword = function(password){        
    return bcrypt.compareSync(password, this.password);   
  };

  // OCULTAR CONTRASEÑA PARA CONSULTA DE LA API REST
  user.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());  
    delete values.password;
    return values;
  }

  return user;
};