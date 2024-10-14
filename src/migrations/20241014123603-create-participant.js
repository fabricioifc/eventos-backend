'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Pode ser ajustado conforme a lógica do seu aplicativo
        references: {
          model: 'users', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o User for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o User for removido
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Pode ser ajustado conforme a lógica do seu aplicativo
        references: {
          model: 'events', // Nome da tabela referenciada
          key: 'id', // Chave primária na tabela referenciada
        },
        onUpdate: 'CASCADE', // Atualiza se o Event for atualizado
        onDelete: 'CASCADE', // Remove os Participantes se o Event for removido
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  }
};