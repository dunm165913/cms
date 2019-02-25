module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Tag = app.model.define(
    'tag',
    {
      name: STRING,

      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      timestamps: false,
    },
  )
  return Tag
}
