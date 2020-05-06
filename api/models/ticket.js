'use strict';
module.exports = (sequelize, DataTypes) => {
  const ticket = sequelize.define('ticket', {
    //timestamps: false,
    id_user: DataTypes.INTEGER,
    ticket_pedido: DataTypes.STRING
  }, {

    tableName:'ticket'
  });
  ticket.associate = function(models) {
    // associations can be defined here

    ticket.belongsTo(models.user,{
      through:'id',
      foreignKey:'id_user'
    })
    
  };
  ticket.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());  
    delete values.getUser.email;
    
    return values;
  }

  return ticket;
};