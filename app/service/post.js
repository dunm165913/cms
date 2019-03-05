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
    const query = { limit: ctx.query.limit, offset: ctx.query.offset, order: [['id', 'DESC']] }
    return ctx.model.Post.findAll(query)
  }

  async findById(post_id) {
    const post = await this.ctx.model.Post.findById(post_id)
    if (!post) {
      return
    }
    return post
  }
}

module.exports = PostService
