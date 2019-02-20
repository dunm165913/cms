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

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
}
