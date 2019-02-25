
const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
const verify = 'CMS_JavaScript_team'

function isLogin(ctx) {
  try {
    const token = ctx.headers.authorization.split(' ')[1]
    const userData = jwt.verify(token, verify)
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

class CommentController extends Controller {
  async show() {
    const rs = await this.ctx.model.Comment.findById(toInt(this.ctx.params.id))
    console.log(rs)
    this.ctx.body = rs
  }

  async index() {
    this.ctx.body = await this.ctx.model.Comment.findAll()
  }
  async destroy() {
    const isLogined = isLogin(this.ctx)
    console.log(isLogined)
    if (isLogined.role === 'admin') {
      const id = toInt(this.ctx.params.id)
      const rs = await this.ctx.model.Comment.findById(id)
      rs.destroy()
      this.ctx.status = 201
    } else {
      this.ctx.status = 400
    }
  }
  async create() {
    const isLogined = isLogin(this.ctx)
    const req = this.ctx.request.body
    console.log(req)
    if (Object.keys(isLogined).length > 0 && req.post_id.length > 0 && req.content.length > 0) {
      await this.ctx.model.Comment.create({
        content: req.content,
        post_id: req.post_id,
        creator_id: isLogined.id,
      })
    } else {
      this.ctx.body = {
        message: 'zvdvdv',
      }
    }
  }

}
module.exports = CommentController
