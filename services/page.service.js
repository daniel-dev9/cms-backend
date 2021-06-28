/**
 * File Imports
 */
const CustomError = require('../utils/errors/custom-error');
const connection = require('./db');

/**
 * Initialize values
 */
// Get DB connection
const db = connection.getInstance().db;
const tableName = "demo_pages";

/**
 * @function get_pages - get all pages
 * @returns {Array} Array of Page Objects 
 */
exports.get_pages = async () => {
    try {
        const results = await db.from(tableName).select();
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }
}

/**
 * @function get_page_by_id - get specific page
 * @param {String} pageId - ID of page
 * @returns {Object} Page Object 
 */
exports.get_page_by_id = async (pageId) => {
    try {
        const results = await db.from(tableName).select().where({ id: pageId });
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }
}

/**
 * @function delete_page_by_id - delete a specific page
 * @param {String} pageId - ID of page
 * @returns {Number} the number of deleted pages
 */
exports.delete_page_by_id = async (pageId) => {
    try {
        const results = await db.from(tableName)
            .where({ id: pageId })
            .del();
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }
}

/**
 * @function add_page - create a new page
 * @param {Object} pageData - Page details to be added
 * @returns {Array} array of IDs of added pages
 */
exports.add_page = async (pageData) => {
    try {
        const results = await db.from(tableName)
            .insert({
                url: pageData.url,
                head_title: pageData.head_title,
                head_description: pageData.head_description,
                text_title: pageData.text_title,
                text_paragraph: pageData.text_paragraph
            });
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }

}

/**
 * @function update_page - update a specific page
 * @param {Object} pageData - Page details to be updated
 * @returns {Array} array of IDs of updated pages
 */
exports.update_page = async (pageData) => {
    try {
        const results = await db.from(tableName)
            .where({ id: pageData.id })
            .update({
                url: pageData.url,
                head_title: pageData.head_title,
                head_description: pageData.head_description,
                text_title: pageData.text_title,
                text_paragraph: pageData.text_paragraph
            });
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }
}