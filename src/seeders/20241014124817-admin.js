'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: '$2b$10$3JjJwQ2j2g8B9Gvz3lNQXeW4vJyZJZt8Zp9x1tC0ZfL3gk3G8Kz4u',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        email: 'user@user.com',
        password: '$2b$10$3JjJwQ2j2g8B9Gvz3lNQXeW4vJyZJZt8Zp9x1tC0ZfL3gk3G8Kz4u',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
