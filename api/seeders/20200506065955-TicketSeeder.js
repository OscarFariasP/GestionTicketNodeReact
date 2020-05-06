'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   const db = require('../models');
   return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(()=>{
    return db.ticket.destroy({ truncate : true, cascade: true }).then(()=>{
      return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(()=>{
        return queryInterface.bulkInsert('ticket', [
          { id_user:2,ticket_pedido:'Test1...'},
          { id_user:3,ticket_pedido:'Test2...'},
        ], {})
      })
    })
    })


  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('ticket', null, {});
  }
};
