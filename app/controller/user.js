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

class UserController extends Controller {
  async show() {
    const rs = await this.ctx.model.User.findAll()
    this.ctx.body = rs
  }

  async index() {
    const ctx = this.ctx
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) }
    ctx.body = await ctx.model.User.findAll(query)
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
      this.ctx.body = {
        message: 'sai mat khau',
        token: {},
      }
    } else
      this.ctx.body = {
        message: 'loi tham so',
        token: {},
      }
  }
  async create() {
    const user = this.ctx.request.body
    const user_found = await this.ctx.model.User.findAll({
      where: {
        email: user.email,
      },
    })
    if (user_found.length === 0) {
      if (!user.role)
        await this.ctx.model.User.create({
          email: user.email,
          password: bcrypt.hashSync(user.password),
          name: user.name,
          role: 'student',
        })
      else {
        this.ctx.model.User.create(user)
        console.log(user)
      }
      this.ctx.status = 200
    } else {
      this.ctx.body = {
        me: 'email dc su dung',
      }
    }
  }
  // tra ve id site dua vao ten site
  async getIdSite() {
    console.log(this.ctx.query)
    const rs = await this.ctx.model.User.find({
      where: {
        name: this.ctx.query.web_name,
      },
    })
    if (rs) this.ctx.body = rs.id
    else this.ctx.body = -1
  }
}
module.exports = UserController
