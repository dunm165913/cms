'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('posts', 'createAt', Sequelize.TIME)
    await queryInterface.removeColumn('users', 'createAt')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'createAt', Sequelize.TIME)
    await queryInterface.removeColumn('posts', 'createAt')
  },
}
