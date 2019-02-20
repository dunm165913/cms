'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    await queryInterface.createTable('posts', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: STRING(255), allowNull: false },
      content: { type: STRING, allowNull: false },
      user_id: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
}
