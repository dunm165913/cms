const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
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
class PostController extends Controller {
  async show() {
    const ctx = this.ctx
    ctx.body = await ctx.model.Post.findById(toInt(ctx.params.id))
  }
  async create() {
    const ctx = this.ctx
    const req = ctx.request.body
    const isLogined = isLogin(ctx)

    if (
      isLogined.role === 'admin' &&
      req.content.length > 0 &&
      req.tag_id > 0 &&
      req.title.length > 0
    ) {
      await this.ctx.model.Post.create({
        content: req.content,
        tag: req.tag_id,
        title: req.title,
        user_id: isLogined.id,
      })
      this.ctx.status = 200
    } else {
      this.ctx.status = 204
    }
  }
  async destroy() {
    const isLogined = isLogin(this.ctx)
    if (isLogined.role === 'admin') {
      const post = await this.ctx.model.Post.findById(toInt(this.ctx.params.id))
      if (post) {
        post.destroy()
        this.ctx.status = 200
      }
      this.ctx.status = 204
    }
    this.ctx.status = 204
  }
  async index() {
    const post = await this.ctx.model.Post.findAll({
      attributes: ['id', 'title', 'tag'],
      // limit: 2,
    })
    this.ctx.status = 200
    this.ctx.body = post
  }
  async delete() {
    const isLogined = isLogin(this.ctx)
    if (isLogined.role === 'admin') {
      const post = await this.ctx.model.Post.findById(toInt(this.ctx.request.body.id))
      if (post) {
        post.destroy()
        this.ctx.status = 200
        console.log(this.ctx.status)
      } else this.ctx.status = 204
    } else this.ctx.status = 204
  }
  async update() {
    const user = isLogin(this.ctx)
    if (user.role === 'admin') {
      await this.ctx.model.Post.update(
        {
          title: this.ctx.request.body.title,
          content: this.ctx.request.body.content,
          tag: this.ctx.request.body.tag,
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
module.exports = PostController
