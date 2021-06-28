/**
 * Initialize environment status
 */
const environment = process.env.NODE_ENV || 'development'

/**
 * File Imports
 */
const config = require('../knexfile')[environment]

/**
 * @exports KnexBuilder
 */
module.exports = requirxe('knex')(config)