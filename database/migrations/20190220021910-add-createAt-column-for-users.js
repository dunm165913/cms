'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'createAt', Sequelize.DATE)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'createAt')
  },
}
