'use strict'

const Controller = require('egg').Controller

class PostTagController extends Controller {
  async index() {
    const query = { limit: this.ctx.query.limit, offset: this.ctx.query.offset }
    this.ctx.body = this.ctx.model.PostTag.findAll(query)
  }

  async create() {
    const ctx = this.ctx
    const req = ctx.request.body
    const post_tags = await ctx.model.Post_Tag.findAll({
      where: {
        post_id: req.post_id,
        tag_id: req.tag_id,
      },
    })
    if (post_tags) ctx.body = 400
    ctx.body = await ctx.model.Post_Tag.create(req)
  }
}

module.exports = PostTagController
