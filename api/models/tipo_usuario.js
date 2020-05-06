'use strict';
module.exports = (sequelize, DataTypes) => {
  const tipo_usuario = sequelize.define('tipo_usuario', {
   // timestamps: false,
    nombre: DataTypes.STRING
  }, {

    tableName:'tipo_usuario'
  });
  tipo_usuario.associate = function(models) {
    // associations can be defined here
  };
  return tipo_usuario;
};