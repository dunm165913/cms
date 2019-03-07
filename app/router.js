module.exports = app => {
  const { router, controller } = app

  router.resources('users', '/api/users', controller.user)
  router.resources('posts', '/api/posts', controller.post)
  router.resources('admin', '/api/admins', controller.admin)
  router.resources('tags', '/api/tags', controller.tag)
  router.resources('comments', '/api/comments', controller.comment)
  router.post('/api/users/login', controller.user.login)
  router.post('/api/admin/login', controller.admin.login)
  router.post('/api/tags/delete', controller.tag.delete)
  router.post('/api/posts/delete', controller.post.delete)
  router.get('/api/web', controller.user.getIdSite)

  // router.get('/apiwkjhfkwsdhfksjhfkjsdhfkjashfk/users', controller.user.index)
  // router.post('/api/users', controller.user.create)

  // router.get('/api/posts', controller.post.index)
  // router.get('/api/posts/:id', controller.post.show)
  // router.post('/api/posts', controller.post.create)

  // router.get('/api/tags', controller.tag.index)
  // router.get('/api/tags/:id', controller.tag.show)
  // router.post('/api/tags', controller.tag.create)

  // router.get('/api/post-tag', controller.posttag.index)
  // router.post('/api/post-tag', controller.posttag.create)
}
