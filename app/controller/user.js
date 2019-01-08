const Controller = require('egg').Controller

const User = require('../model/user')

class UserController extends Controller {
  async index() {
    this.ctx.body = new User().get()
  }

  show() {
    this.ctx.body = 'Hi!'
  }
}

module.exports = UserController
