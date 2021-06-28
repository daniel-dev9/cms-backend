/**
 * Import modules
 */
require('dotenv').config()

/**
 * Create constants from process.env
 */
const { DB_CLIENT, DB_NAME, DB_USERNAME, DB_PASS, DB_URL, DB_PORT } = process.env

module.exports = {
  development: {
      client: DB_CLIENT,
      connection: {
          database: DB_NAME,
          user: DB_USERNAME,
          password: DB_PASS,
          host: DB_URL,
          port: DB_PORT,
      },
      migrations: {
          directory: __dirname + '/db/migrations',
      },
      seeds: {
          directory: __dirname + '/db/seeds',
      },
  },

  staging: {
      client: 'mysql',
      connection: {
          database: 'my_db',
          user: 'username',
          password: 'password',
      },
      pool: {
          min: 2,
          max: 10,
      },
      migrations: {
          tableName: 'knex_migrations',
      },
  },

  production: {
      client: 'mysql',
      connection: {
          database: 'my_db',
          user: 'username',
          password: 'password',
      },
      pool: {
          min: 2,
          max: 10,
      },
      migrations: {
          tableName: 'knex_migrations',
      },
  }
}
