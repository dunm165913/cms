'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER } = Sequelize
    await queryInterface.createTable('tags', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: STRING(255) },
      user_id: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tags')
  },
}
