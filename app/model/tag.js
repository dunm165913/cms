module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Tag = app.model.define(
    'tag',
    {
      name: STRING,
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    },
  )
  return Tag
}
