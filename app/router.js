module.exports = app => {
  const { router, controller } = app

  router.resources('/', controller.user)
}
