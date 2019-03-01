'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize
    await queryInterface.createTable('posttag', {
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('poststags')
  },
}
