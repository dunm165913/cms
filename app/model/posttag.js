module.exports = app => {
  const { INTEGER } = app.Sequelize
  const Post_Tag = app.model.define('post-tag', {
    post_id: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
    tag_id: {
      type: INTEGER,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
  })
  return Post_Tag
}
