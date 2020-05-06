'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    // ADD ROLE FOREIGN KEY
   return queryInterface.addConstraint('user', ['id_tipouser'], {
    type: 'FOREIGN KEY',
    name: 'FK_ROLE',
    references: {
      table: 'tipo_usuario',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'no action',
    }).then(()=>{
      
      return  queryInterface.addConstraint('ticket', ['id_user'], {
        type: 'FOREIGN KEY',
        name: 'FK_USERSTICKET',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'no action',
      })
    
    })


  },

  down: (queryInterface, Sequelize) => {

    return  queryInterface.removeConstraint('user','FK_ROLE').then(()=>{
      return queryInterface.removeConstraint('ticket','FK_USERSTICKET')
    });
      

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

  }
};
