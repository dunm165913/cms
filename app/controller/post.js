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
    const post = await ctx.service.post.findById(toInt(ctx.params.id))
    if (!post) {
      ctx.status = 404
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

      ctx.status = 200
    } else {
      ctx.status = 400
      ctx.body = {
        me: 'loi',
      }
    }
  }

  // destroy cái này phải destroy toàn bộ những feld có reference tới nó trước.
  async index() {
    const ctx = this.ctx
    ctx.body = await ctx.service.post.getAll(ctx.query.web_id)
  }

  async delete() {
    const ctx = this.ctx
    const isLogined = isLogin(ctx)
    if (isLogined.role === 'admin') {
      const post = await ctx.model.Post.findById(toInt(ctx.request.body.id))
      if (post) {
        post.destroy()
        // xoa het posttags
        await ctx.service.posttag.deleteFromPostId(ctx.request.body.id)
        ctx.status = 200
      } else ctx.status = 204
    } else ctx.status = 204
  }
  async update() {
    const ctx = this.ctx
    const user = isLogin(ctx)
    if (user.role === 'admin') {
      await ctx.model.Post.update(
        {
          title: ctx.request.body.title,
          content: ctx.request.body.content,
        },
        {
          where: {
            id: ctx.params.id,
          },
        },
      )
      await ctx.service.posttag.deleteFromPostId(ctx.params.id)
      const postTags = ctx.request.body.tags
      for (const posttag of postTags)
        await ctx.service.posttag.createPostTag(ctx.params.id, posttag)
      ctx.status = 200
    } else ctx.status = 204
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
