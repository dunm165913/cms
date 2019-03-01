module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize
  const Post = app.model.define(
    'post',
    {
      user_id: INTEGER,
      content: STRING,
      title: STRING,
      createAt: { type: DATE, allowNull: false },
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      timestamps: false,
    },
  )
  return Post
}
