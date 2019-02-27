module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Post = app.model.define(
    'post',
    {
      user_id: STRING,
      content: STRING,
      title: STRING,
      tag: INTEGER,
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      timestamps: false,
    },
  )
  return Post
}
