module.exports = app => {
  const { router, controller } = app

  router.resources('users', '/users', controller.user)
  router.resources('posts', '/posts', controller.post)
  router.resources('admin', '/admins', controller.admin)
  router.resources('tags', '/tags', controller.tag)
  router.resources('comments', '/comments', controller.comment)
  router.post('/users/login', controller.user.login)
  router.post('/admin/login', controller.admin.login)
}
