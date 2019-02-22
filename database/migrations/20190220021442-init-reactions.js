'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('reactions', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      type: STRING(30),
      post_id: {
        type: INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      creator_id: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reactions')
  },
}
