'use strict'

const Service = require('egg').Service

class TagService extends Service {
  async getTagForAPost(tag_id) {
    return await this.ctx.model.Tag.findById(tag_id)
  }

  async getTagObject(tag_id) {
    const ctx = this.ctx
    const tag = await this.findTagById(tag_id)
    const postTags = await ctx.service.posttag.getPostsOfaTag(tag_id)
    const posts = []
    for (const postTag of postTags) posts.push(await ctx.service.post.findPostById(postTag.post_id))
    return Object.assign({}, tag.dataValues, { posts: [...posts] })
  }

  async findTagById(tag_id) {
    const tag = await this.ctx.model.Tag.findById(tag_id)
    if (tag) return tag
    return
  }
}

module.exports = TagService
