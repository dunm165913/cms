module.exports = app => {
  const { router, controller } = app

  router.resources('/users', controller.user)
}
