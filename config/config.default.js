'use strict'
exports.security = {
  csrf: {
    enable: false,
  },
}
exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
}

exports.sequelize = {
  dialect: 'postgres',
  database: 'cms_be',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
}
