/**
 * Module imports
 */
const { v4: uuidv4 } = require('uuid');

/**
 * File Imports
 */
const imageService = require('../services/image.service');
/**
 * @function addImage - add single image to S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @param  {Object} image - Image Object
 */
const addImage = async (pageId,image) => {
    const imageExtension = image.originalname.split(".")[1];
    // Create unique filename with the help of uuid
    const fileName = uuidv4() +"." +imageExtension;
    const rawImage = image.buffer;
    console.log(fileName,rawImage);
    await imageService.add_image(pageId,fileName,rawImage);
}

/**
 * @function addImages - add array of images to S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @param  {Array} images - Array of Image Objects
 * @returns {Boolean} whether images were successfully added
 */
exports.addImages = async (pageId,images) => {
    try {
        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            await addImage(pageId,image);
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

/**
 * @function getImagesOfPage - get all images of specific page
 * @param  {String} pageId - ID of Page
 * @returns {Array} Array of Images of Page
 */
exports.getImagesOfPage = async(pageId) => {
    return await imageService.get_images_of_page(pageId);
}

/**
 * @function deleteImagesOfPage - remove images of a specific page from S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @returns {Array} Array of Images deleted
 */
exports.deleteImagesOfPage = async (pageId) => {
    return await imageService.delete_images_of_page(pageId);
}

/**
 * @function deleteSpecificImagesOfPage - remove specific image of a specific page from S3 Bucket and Images table
 * @param  {String} pageId - ID of Page
 * @param  {Object} imageIds - Array of Image IDs to be deleted
 * @returns {Array} Array of Images deleted
 */
exports.deleteSpecificImagesOfPage = async (pageId,imageIds) => {
    return await imageService.delete_specific_images_of_page(pageId,imageIds);
}