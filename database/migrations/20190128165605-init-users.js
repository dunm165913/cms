'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    })
  },
  // The function called when performing a database downgrade, delete the `users` table
  down: async queryInterface => {
    await queryInterface.dropTable('users')
  },
}
