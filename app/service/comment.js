'use strict'

const Service = require('egg').Service

class CommentService extends Service {
  // Lay toan bo comment cua mot post
  async getCommentsOfPost(post_id) {
    return await this.ctx.model.Comment.findAll({
      where: {
        post_id,
      },
    })
  }

  // Xoa het comment cua mot post
  async deleteCommentsOfPost(post_id) {
    const comments = await this.getCommentsOfPost(post_id)
    for (const comment of comments) comment.destroy()
  }
  async deleteFromPostId(post_id) {
    const comments = await this.ctx.model.Comment.findAll({
      where: {
        post_id,
      },
    })
    for (const comment of comments) comment.destroy()
  }
}

module.exports = CommentService
