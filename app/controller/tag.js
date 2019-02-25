const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const verify = 'CMS_JavaScript_team'

function isLogin(ctx) {
  try {
    const token = ctx.headers.authorization.split(' ')[1]
    const userData = jwt.verify(token, verify)
    console.log(token)
    return userData
  } catch (err) {
    return {}
  }
}
function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class TagController extends Controller {
  async show() {
    const rs = await this.ctx.model.Tag.findById(toInt(this.ctx.params.id))
    console.log(rs)
    this.ctx.body = rs
  }

  async index() {
    this.ctx.body = await this.ctx.model.Tag.findAll()
  }
  async create() {
    const req = this.ctx.request.body
    const user = isLogin(this.ctx)
console.log(this.ctx.headers)
    if (user.role === 'admin' && req.name.length > 0) {
      console.log(req)
      await this.ctx.model.Tag.create({
        name: req.name
      })
      this.ctx.status = 200
    }
    else this.ctx.status = 400
  }
  async destroy() {
    const isLogined = isLogin(this.ctx)
    console.log(isLogined)
    console.log(this.ctx)
    if (isLogined.role === 'admin') {
      const id = toInt(this.ctx.params.id)
      const rs = await this.ctx.model.Tag.findById(id)
      rs.destroy()
      this.ctx.status = 200
    } else {
      this.ctx.status = 204
    }
  }

}
module.exports = TagController
