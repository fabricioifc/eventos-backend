'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Estudar Node.js',
        description: 'Estudar Node.js e criar um projeto',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Estudar React',
        description: 'Estudar React e criar um projeto',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Estudar React Native',
        description: 'Estudar React Native e criar um projeto',
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // npx sequelize-cli db:seed --seed 20241028181122-todos.js

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};
