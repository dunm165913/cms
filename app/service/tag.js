'use strict'

const Service = require('egg').Service

class TagService extends Service {
  async findById(tag_id) {
    return await this.ctx.model.Tag.findById(tag_id)
  }
}

module.exports = TagService
