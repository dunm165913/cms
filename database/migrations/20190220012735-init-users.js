'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize
    queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING(30), allowNull: false },
      email: { type: STRING(255), allowNull: false },
      password: { type: STRING(30), allowNull: false },
      role: { type: STRING(30), defaultValue: 'member', allowNull: false },
    })
  },

  down: (queryInterface, Sequelize) => {},
}
