const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
const verify = 'CMS_JavaScript_team'
const Sequelize = require('sequelize')
const sequelize = new Sequelize('cms_be', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
})

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
  // get a post instance and get all tag, comment, reaction of this post.
  async show() {
    const ctx = this.ctx
    const post = await ctx.service.post.findById(toInt(this.ctx.params.id))
    if (!post) {
      this.ctx.status = 404
      return
    }

    const comments = await ctx.service.comment.getCommentsOfPost(post.id)
    const reactions = await ctx.service.reaction.getReactionsOfaPost(post.id)
    const postTags = await ctx.service.posttag.getTagsOfaPost(post.id)
    const tags = []
    for (const postTag of postTags) tags.push(await ctx.service.tag.findById(postTag.tag_id))
    ctx.body = Object.assign({}, post.dataValues, {
      tags: ([] = [...tags]),
      comments: ([] = [...comments]),
      reactions: ([] = [...reactions]),
    })
  }

  async create() {
    const ctx = this.ctx
    const req = ctx.request.body
    const isLogined = isLogin(ctx)
    if (isLogined.role === 'admin' && req.content.length > 0 && req.title.length > 0) {
      const date = new Date(Date.now())
      const post = await ctx.model.Post.create(
        Object.assign({}, req, {
          create_at: date,
          user_id: isLogined.id,
        }),
      )
      for (const tag of req.tags) await ctx.service.posttag.createPostTag(post.id, tag)

      ctx.body = post
      ctx.body = {
        me: 'ok',
      }
    } else {
      ctx.body = {
        me: 'loi',
      }
    }
  }

  // destroy cái này phải destroy toàn bộ những feld có reference tới nó trước.
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
    this.ctx.body = await this.ctx.service.post.getAll()
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
        },
        {
          where: {
            id: this.ctx.params.id,
          },
        },
      )
      // xoa het posttag voi id tag
      // sau do tao lai posttag
      this.ctx.status = 200
    } else this.ctx.status = 204
  }
}

const req = {
  title: String,
  content: String,
  image_url: String,
  tags: [],
  author_id: String,
}
module.exports = PostController
