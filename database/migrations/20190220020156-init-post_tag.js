'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize
    await queryInterface.createTable('post-tag', {
      post_id: {
        type: INTEGER,
        primaryKey: true,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      tag_id: {
        type: INTEGER,
        primaryKey: true,
        references: {
          model: 'tags',
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
