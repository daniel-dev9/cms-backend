/**
 * File Imports
 */
const pageService = require('../services/page.service');
const CustomError = require('../utils/errors/custom-error');

/**
 * @function getAllPages - get all pages
 * @returns {Array} Array of Page Objects 
 */
exports.getAllPages = async () => {
    const pages = await pageService.get_pages();
    return pages;
};

/**
 * @function getAllPages - get specific page
 * @param {String} id - ID of page
 * @returns {Object} Page Object 
 */
exports.getPageById = async (id) => {
    const page = await pageService.get_page_by_id(id);
    if (!page || page.length === 0) {
        throw new CustomError(400, "Invalid Id");
    }
    return page;
};

/**
 * @function deletePageById - delete a specific page
 * @param {String} id - ID of page
 * @returns {Number} the number of deleted pages
 */
exports.deletePageById = async (id) => {
    const page = await pageService.delete_page_by_id(id);
    if (!page || page === 0){
        throw new CustomError(400, "Delete unsuccessful");
    }
    return page;
}

/**
 * @function addPage - create a new page
 * @param {Object} pageData - Page details to be added
 * @returns {Array} array of IDs of added pages
 */
exports.addPage = async(pageData) => {
    const page = await pageService.add_page(pageData);
    if (!page || page.length === 0){
        throw new CustomError(400, "Insert unsuccessful");
    }
    return page;
}

/**
 * @function updatePageById - update a specific page
 * @param {Object} pageData - Page details to be updated
 * @returns {Array} array of IDs of updated pages
 */
exports.updatePageById = async(pageData) => {
    const page = await pageService.update_page(pageData);
    if (!page || page.length === 0){
        throw new CustomError(400, "Update unsuccessful");
    }
    return page;
}