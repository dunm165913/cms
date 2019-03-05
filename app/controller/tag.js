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
  // get a tag instance and all post of this tag.
  async show() {
    const ctx = this.ctx
    const tag = await ctx.service.tag.findById(toInt(ctx.params.id))
    if (!tag) {
      ctx.status = 404
      return
    }
    ctx.body = tag
  }
  // ham tra ve tat ca tag cua nguoi dung tuong ung
  // do so luong tag co it nen ko can offset hay limit
  async index() {
    this.ctx.body = await this.ctx.model.Tag.findAll({
      where: {
        user_id: this.ctx.query.user_id,
      },
    })
  }
  async create() {
    const req = this.ctx.request.body
    const user = isLogin(this.ctx)
    console.log(user)
    if (user.role === 'admin' && req.name.length > 0) {
      console.log(req)
      this.ctx.body = await this.ctx.model.Tag.create({
        name: req.name,
        user_id: user.id,
      })
      this.ctx.status = 200
    } else this.ctx.status = 204
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
  async delete() {
    const isLogined = isLogin(this.ctx)
    if (isLogined.role === 'admin') {
      const id = toInt(this.ctx.request.body.id)
      const rs = await this.ctx.model.Tag.findById(id)
      if (rs) {
        rs.destroy()
        this.ctx.status = 200
      } else {
        this.ctx.status = 204
      }
    } else {
      this.ctx.status = 204
    }
  }
  async update() {
    const user = isLogin(this.ctx)
    if (user.role === 'admin') {
      await this.ctx.model.Tag.update(
        {
          name: this.ctx.request.body.name,
        },
        {
          where: {
            id: this.ctx.params.id,
          },
        },
      )
      this.ctx.status = 200
    } else this.ctx.status = 204
  }
}
module.exports = TagController
