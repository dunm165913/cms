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

  async findPostObject(post_id) {
    const ctx = this.ctx
    const post = await this.findPostById(post_id)
    if (!post) {
      return
    }
    const comments = await ctx.service.comment.getCommentsOfPost(post.id)
    const reactions = await ctx.service.reaction.getReactionsOfaPost(post.id)
    const postTags = await ctx.service.posttag.getTagsOfaPost(post.id)
    const tags = []
    for (const postTag of postTags) tags.push(await ctx.service.tag.getTagForAPost(postTag.tag_id))
    // return acture post
    return Object.assign({}, post.dataValues, {
      tags: ([] = [...tags]),
      comments: ([] = [...comments]),
      reactions: ([] = [...reactions]),
    })
  }

  async findPostById(post_id) {
    const post = await this.ctx.model.Post.findById(post_id)
    if (!post) {
      return
    }
    return post
  }
}

module.exports = PostService
