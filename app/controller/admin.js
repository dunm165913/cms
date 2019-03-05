const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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

class AdminController extends Controller {
  async show() {
    const rs = await this.ctx.model.Tag.findById(toInt(this.ctx.params.id))
    this.ctx.body = rs
  }

  async index() {
    const query = { limit: this.ctx.query.limit, offset: this.ctx.query.offset }
    this.ctx.body = await this.ctx.model.Tag.findAll(query)
  }
  async destroy() {
    const isLogined = isLogin(this.ctx)
    console.log(isLogined)
    if (isLogined.role === 'admin') {
      const id = toInt(this.ctx.params.id)
      const rs = await this.ctx.model.User.findById(id)
      rs.destroy()
      this.ctx.status = 201
    } else {
      this.ctx.status = 400
    }
  }

  async login() {
    const req = this.ctx.request.body
    // console.log(req)
    if (req.email.length > 6 && req.password.length > 6) {
      const rs = await this.ctx.model.User.findAll({
        where: { email: req.email },
      })
      console.log(rs)
      if (rs.length > 0 && bcrypt.hashSync(req.password, rs[0].dataValues.password)) {
        const token = jwt.sign(
          {
            username: rs[0].dataValues.username,
            id: rs[0].dataValues.id,
            role: rs[0].dataValues.role,
          },
          verify,
          {
            expiresIn: 60 * 60 * 60,
          },
        )
        return (this.ctx.body = {
          token,
          id: rs[0].dataValues.id,
          name: rs[0].dataValues.name,
        })
      }
      if (rs.length === 0) {
        return (this.ctx.body = {
          message: 'TK kho ton tai',
        })
      }
      // console.log(rs);
      return (this.ctx.body = {
        message: 'sai mat khau',
      })
    }
    return (this.ctx.body = {
      message: 'loi tham so',
    })
  }

  async create() {
    const user = this.ctx.request.body

    const user_found = await this.ctx.model.User.findAll({
      where: {
        email: user.email,
      },
    })
    if (user_found.length === 0) {
      const rs = await this.ctx.model.User.create({
        email: user.email,
        password: bcrypt.hashSync(user.password),
        name: user.username,
        role: 'admin',
      })

      await this.ctx.model.Tag.create({
        name: 'undefined',
        user_id: rs.dataValues.id,
      })
      this.ctx.status = 200
    } else {
      this.ctx.status = 204
      this.ctx.body = {
        me: 'email dc su dung',
      }
    }
  }
}
module.exports = AdminController
