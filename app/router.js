module.exports = app => {
  const { router, controller } = app

  router.resources('users', '/users', controller.user)
  router.resources('posts', '/posts', controller.post)
  router.resources('admin', '/admins', controller.admin)
  router.resources('tags', '/tags', controller.tag)
  router.resources('comments', '/comments', controller.comment)
  router.post('/users/login', controller.user.login)
  router.post('/admin/login', controller.admin.login)
  router.post('/tags/delete', controller.tag.delete)
  router.post('/posts/delete', controller.post.delete)

  router.get('/api/users', controller.user.index)
  router.post('/api/users', controller.user.create)

  router.get('/api/posts', controller.post.index)
  router.get('/api/posts/:id', controller.post.show)
  router.post('/api/posts', controller.post.create)

  router.get('/api/tags', controller.tag.index)
  router.get('/api/tags/:id', controller.tag.show)
  router.post('/api/tags', controller.tag.create)

  router.get('/api/post-tag', controller.posttag.index)
  router.post('/api/post-tag', controller.posttag.create)
}
