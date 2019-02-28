'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize
    await queryInterface.createTable('posts', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: STRING(255), allowNull: false },
      content: { type: STRING, allowNull: false },
      createAt: { type: DATE, allowNull: false },
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
    await queryInterface.dropTable('posts')
  },
}
