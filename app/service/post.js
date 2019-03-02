'use strict'

const Service = require('egg').Service

function toInt(str) {
  if (typeof str === 'number') return str
  if (!str) return str
  return parseInt(str, 10) || 0
}

class PostService extends Service {
  async getAll() {
    const ctx = this.ctx
    const query = { limit: ctx.query.limit, offset: ctx.query.offset }
    return ctx.model.Post.findAll(query)
  }

  async find(postId) {
    const ctx = this.ctx
    const post = await ctx.model.Post.findById(postId)
    if (!post) {
      return
    }
    const comments = await ctx.model.Comment.findAll({
      where: {
        post_id: toInt(postId),
      },
    })
    const reactions = await ctx.model.Reaction.findAll({
      where: {
        post_id: toInt(postId),
      },
    })
    const postTags = await ctx.model.Posttag.findAll({
      where: {
        post_id: toInt(postId),
      },
    })
    const tags = []
    for (const postTag of postTags) tags.push(await ctx.model.Tag.findById(postTag.tag_id))
    // return acture post
    return Object.assign({}, post.dataValues, {
      tags: ([] = [...tags]),
      comments: ([] = [...comments]),
      reactions: ([] = [...reactions]),
    })
  }
}

module.exports = PostService
