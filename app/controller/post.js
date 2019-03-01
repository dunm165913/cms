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
  // get a post instance and get all tag, comment, reaction of this post.
  async show() {
    const ctx = this.ctx
    // get comments
    const comments = await ctx.model.Comment.findAll({
      where: {
        post_id: toInt(ctx.params.id),
      },
    })
    // get reactions
    const reactions = await ctx.model.Reaction.findAll({
      where: {
        post_id: toInt(ctx.params.id),
      },
    })
    // get tags
    const postTags = await ctx.model.Posttag.findAll({
      where: {
        post_id: toInt(ctx.params.id),
      },
    })

    const tags = []
    for (const postTag of postTags) tags.push(await ctx.model.Tag.findById(postTag.tag_id))

    // get post
    const post = await ctx.model.Post.findById(toInt(ctx.params.id))
    if (!post) {
      ctx.status = 404
      return
    }
    // return acture post
    ctx.body = {
      id: post.id,
      title: post.title,
      content: post.content,
      createAt: post.createAt,
      tags: ([] = [...tags]),
      comments: ([] = [...comments]),
      reactions: ([] = [...reactions]),
    }
  }

  async create() {
    const ctx = this.ctx
    const req = ctx.request.body
    // const isLogined = isLogin(ctx)

    // if (
    //   isLogined.role === 'admin' &&
    //   req.content.length > 0 &&
    //   req.tag_id > 0 &&
    //   req.title.length > 0
    // ) {
    const date = new Date(Date.now())
    ctx.body = await ctx.model.Post.create({
      content: req.content,
      title: req.title,
      create_at: date,
      user_id: req.user_id,
      // user_id: isLogined.id,
    })
    //   ctx.status = 200
    // } else {
    //   ctx.status = 204
    // }
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
    const ctx = this.ctx
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) }
    const post = await ctx.model.Post.findAll(query)
    ctx.status = 200
    ctx.body = post
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
