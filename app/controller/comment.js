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

class CommentController extends Controller {
  async show() {
    const rs = await this.ctx.model.Comment.findById(toInt(this.ctx.params.id))
    console.log(rs)
    this.ctx.body = rs
  }

  async index() {
    this.ctx.body = await this.ctx.model.Comment.findAll({
      where: {
        post_id: this.ctx.query.post_id,
      },
    })
  }
  async destroy() {
    const isLogined = isLogin(this.ctx)
    console.log(isLogined)
    if (isLogined.role === 'admin') {
      const id = toInt(this.ctx.params.id)
      const rs = await this.ctx.model.Comment.findById(id)
      rs.destroy()
      this.ctx.status = 200
    } else {
      this.ctx.status = 204
    }
  }
  async create() {
    const req = this.ctx.request.body
    console.log(req)
    if (req.post_id > 0 && req.content.length > 0) {
      await this.ctx.model.Comment.create({
        content: req.content,
        post_id: req.post_id,
        creator_id: req.name,
      })
      this.ctx.status = 200
    } else {
      this.ctx.status = 204
    }
  }
  async delete() {
    const user = isLogin(this.ctx)
    if (user.role == 'admin') {
      const comment = await this.ctx.model.Comment.findById(this.ctx.request.body.id)
      if (comment) {
        const post = await this.ctx.model.Post.findAll({
          where: {
            id: comment.post_id,
            user_id: user.id,
          },
        })
        if (post.length > 0) {
          comment.destroy()

          this.ctx.body = { message: 'ok' }
        } else {
          ;(this.status = 204), (this.ctx.body = { message: 'comment ko thuoc bai viet' })
        }
      } else {
        ;(this.status = 204), (this.ctx.body = { message: 'ko ton tai comment' })
      }
    } else {
      ;(this.status = 204), (this.ctx.body = { message: 'ban ko co quyen' })
    }
  }
}
module.exports = CommentController
