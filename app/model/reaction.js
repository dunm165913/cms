module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize
  const Reaction = app.model.define(
    'reaction',
    {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      type: STRING(30),
      post_id: {
        type: INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
      },
      creator_id: {
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
  return Reaction
}
