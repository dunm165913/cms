'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER } = Sequelize
    await queryInterface.createTable('comments', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      content: STRING(255),
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
    await queryInterface.dropTable('comments')
  },
}
