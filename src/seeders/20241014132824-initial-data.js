'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Inserir Eventos
    await queryInterface.bulkInsert('Events', [
      {
        title: 'Conferência de Tecnologia',
        date: new Date('2024-11-01'),
        startTime: '09:00:00',
        endTime: '17:00:00',
        capacity: 100,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Workshop de Desenvolvimento Web',
        date: new Date('2024-12-05'),
        startTime: '10:00:00',
        endTime: '15:00:00',
        capacity: 50,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Buscar usuários
    const users = await queryInterface.sequelize.query(`SELECT id from Users;`);
    const userIds = users[0].map(user => user.id);

    // Inserir Participantes
    const events = await queryInterface.sequelize.query(`SELECT id from Events;`);
    const eventIds = events[0].map(event => event.id);

    await queryInterface.bulkInsert('Participants', [
      {
        userId: userIds[0],
        eventId: eventIds[0],
      },
      {
        userId: userIds[0],
        eventId: eventIds[1],
      },
      {
        userId: userIds[1],
        eventId: eventIds[1],
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
    await queryInterface.bulkDelete('Participants', null, {});
  }
};
