'use strict'

const Service = require('egg').Service

class ReactionService extends Service {
  async getReactionsOfaPost(post_id) {
    return await this.ctx.model.Reaction.findAll({
      where: {
        post_id,
      },
    })
  }
}

module.exports = ReactionService
