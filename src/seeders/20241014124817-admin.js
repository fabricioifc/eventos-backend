'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'fabricio.bizotto@ifc.edu.br',
        password: '$2a$10$HoKw5eQKvf8xcpJ.PVa4M.KAFSklk2Veh.fKJ5bwGu0ejUrIbDcFq', // 123456
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        email: 'fabricio.bizotto@gmail.com',
        password: '$2a$10$HoKw5eQKvf8xcpJ.PVa4M.KAFSklk2Veh.fKJ5bwGu0ejUrIbDcFq', // 123456
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
