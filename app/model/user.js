module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize

  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING,
      password: STRING,
      email: STRING,
      role: STRING,
    },
    {
      timestamps: false,
    },
  )

  return User
}
