module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const Comment = app.model.define(
    'comment',
    {
      post_id: INTEGER,
      content: STRING,
      creator_id: INTEGER,

      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    },
    {
      timestamps: false,
    },
  )
  return Comment
}
