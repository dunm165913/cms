'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'content')
    await queryInterface.addColumn('posts', 'content', Sequelize.TEXT)
  },

  down: async (queryInterface, Sequelize) => {},
}
