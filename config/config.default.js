'use strict'

module.exports = appInfo => {
  const config = {}

  config.keys = 'dfgiodfjgofdjg89'

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  }

  config.sequelize = {
    dialect: 'postgres',
    database: 'egg-sequelize-doc-default',
    host: 'localhost',
    port: 51015,
    username: 'postgres',
    password: 'postgres',
  }

  return config
}
