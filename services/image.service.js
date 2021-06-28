/**
 * File Imports
 */
const CustomError = require('../utils/errors/custom-error');
const { uploadImage, deleteImages } = require('../utils/images/image-handler');
const connection = require('./db');

/**
 * Initialize values
 */
// Get DB connection
const db = connection.getInstance().db;
const tableName = "demo_images";

/**
 * @function add_image - add image to S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @param  {String} key - Key of image to be stored in the bucket - Filename
 * @param  {Buffer} image - Raw buffer of Image
 * @returns {Array} array of IDs of added rows 
 */
exports.add_image = async (pageId, key, image) => {
    try {
        const uploadResults = await uploadImage(key, image);
        const results = await db.from(tableName)
            .insert({
                url: uploadResults.Location,
                img_key: uploadResults.Key,
                page_id: pageId
            });
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }

}

/**
 * @function get_images_of_page - get all images of specific page
 * @param  {String} pageId - ID of Page
 * @returns {Array} array of Images of Specific Page
 */
exports.get_images_of_page = async (pageId) => {
    try {
        const results = await db.from(tableName)
            .where({ page_id: pageId });
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }
}

/**
 * @function delete_images_of_page - remove images of a specific page from S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @returns {Array} Array of Images deleted
 */
exports.delete_images_of_page = async (pageId) => {
    try {
        const results = await db.from(tableName)
            .where({ page_id: pageId });
        if (!results || results.length === 0) {
            return
        }
        const imagesToDelete = results.map(row => {
            return {
                Key: row.img_key
            }
        });
        await deleteImages(imagesToDelete)
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }

}

/**
 * @function delete_images_of_page - remove images of a specific page from S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @param  {String} imageIds - Array of Image IDs to be deleted
 * @returns {Array} Array of Images deleted
 */
exports.delete_specific_images_of_page = async (pageId, imageIds) => {
    try {
        const results = await db.from(tableName)
            .where({ page_id: pageId })
            .whereIn('id', imageIds);
        if (!results || results.length === 0) {
            return
        }
        const imagesToDelete = results.map(row => {
            return {
                Key: row.img_key
            }
        });
        await deleteImages(imagesToDelete);
        await db.from(tableName)
            .where({ page_id: pageId })
            .whereIn('id', imageIds)
            .del();
        return results;
    } catch (error) {
        console.log(error);
        throw new CustomError(503);
    }

}
