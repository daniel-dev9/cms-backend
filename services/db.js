/**
 * File Imports
 */
const CustomError = require('../utils/errors/custom-error');
const DB = require('./knex');

/**
 * A singleton class for initiation of database connection 
 * Does a sample query to check connection status
 */
class ConnectionSingleton {
    constructor() {
        try {
            this.db = DB;
            this.db.schema.raw("Select 1").then(
                res => console.log("DB Connection Successful")
            );
        } catch (error) {
            throw new CustomError(503,"DB Error");
        }
    }
}

/**
 * A connection class to make sure database connection is only instantiated once
 * @returns {Connection.instance} instance of DB connection
 */
class Connection {
    constructor() {
        throw new Error('Use Connection.getInstance()');
    }
    static getInstance() {
        if (!Connection.instance) {
            Connection.instance = new ConnectionSingleton();
        }
        return Connection.instance;
    }
}

/**
 * @exports Connection
 */
module.exports = Connection;