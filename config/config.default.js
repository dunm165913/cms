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
    database: 'cms_be',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
  }

  return config
}
