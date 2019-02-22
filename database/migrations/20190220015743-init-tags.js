'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, INTEGER } = Sequelize
    await queryInterface.createTable('tags', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: STRING(255) },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tags')
  },
}
