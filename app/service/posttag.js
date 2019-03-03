'use strict'

const Service = require('egg').Service

class PosttagService extends Service {
  // Lay toan bo cap post-tag cua mot tag
  async getPostsOfaTag(tag_id) {
    return await this.ctx.model.Posttag.findAll({
      where: {
        tag_id,
      },
    })
  }

  // Lay toan bo cap post-tag cua mot post
  async getTagsOfaPost(post_id) {
    return await this.ctx.model.Posttag.findAll({
      where: {
        post_id,
      },
    })
  }
}

module.exports = PosttagService
