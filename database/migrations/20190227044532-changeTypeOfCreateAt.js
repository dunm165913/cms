'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('posts', 'createAt', Sequelize.TIME)
    await queryInterface.addColumn('posts', 'createAt', Sequelize.DATE)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'createAt', Sequelize.DATE)
  },
}
