'use strict';
const bcrypt = require("bcrypt");
module.exports = {
  up: (queryInterface, Sequelize) => {
    const db = require('../models');
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(()=>{
      return db.user.destroy({ truncate : true, cascade: true }).then(()=>{

        return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1').then(()=>{

          return queryInterface.bulkInsert('user', [
            {
              id_tipouser:1,
              nombre:'Oscar',
              email:'admin@example.com',
              password: bcrypt.hashSync('123456', 10),
            },
            {
              id_tipouser:2,
              nombre:'Juan',
              email:'user@example.com',
              password: bcrypt.hashSync('123456', 10),
            },
            {
              id_tipouser:2,
              nombre:'Maria',
              email:'user1@example.com',
              password: bcrypt.hashSync('123456', 10),
            },
            {
              id_tipouser:2,
              nombre:'Pedro',
              email:'user2@example.com',
              password: bcrypt.hashSync('123456', 10),
            },
            {
              id_tipouser:2,
              nombre:'Luis',
              email:'user3@example.com',
              password: bcrypt.hashSync('123456', 10),
            }], {})

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
   return queryInterface.bulkDelete('user', null, {});
  }
};
