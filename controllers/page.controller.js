/**
 * File Imports
 */
const Page = require('../models/page.model');
const Image = require('../models/image.model');
const CustomError = require('../utils/errors/custom-error');

/**
 * Initialize values
 */
const maxImages = process.env.MAX_IMGS;

/**
 * @function pages_list
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description get all pages
 * @return {Array} 200 - Array of Page Objects - JSON
 */
exports.pages_list = async (req, res, next) => {
    try {
        const pages = await Page.getAllPages();
        return res.status(200).send(pages);
    } catch (error) {
        next(error);
    }

}

/**
 * @function page_detail
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description get specific  page
 * @return {Object} 200 - Page Object with an Array of Images - JSON
 */
exports.page_detail = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new CustomError(400, "Invalid Parameter");
        }
        const page = await Page.getPageById(id);
        const imageResults = await Image.getImagesOfPage(id);
        const imagesOfPage = imageResults.map(row => {
            return {
                id: row.id,
                url: row.url
            }
        })
        const responseObj = {
            ...page[0],
            images: imagesOfPage
        }
        return res.status(200).send(responseObj);
    } catch (error) {
        next(error);
    }

}

/**
 * @function page_create_post
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description create a new page with images
 * @return {Object} 200 - Object with Page ID and Message - JSON
 */
exports.page_create_post = async (req, res, next) => {
    try {
        const body = req.body;
        const images = req.files;
        if (!body.url || !body.head_title || !body.head_description || !body.text_title || !body.text_paragraph || images.length === 0) {
            throw new CustomError(400, "Invalid Parameter");
        }
        const pageData = {
            url: body.url,
            head_title: body.head_title,
            head_description: body.head_description,
            text_title: body.text_title,
            text_paragraph: body.text_paragraph
        }
        const page = await Page.addPage(pageData);
        // const page =0;
        // console.log(req.files);
        const pageId = page[0];

        await Image.addImages(pageId, images);

        const payload = {
            page_id: pageId,
            message: `Insert page successful with ID ${pageId}`
        }
        return res.status(200).send({ ...payload });
    } catch (error) {
        next(error);
    }

}

/**
 * @function page_update_put
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description update existing page with images
 * @return {Object} 200 - Object with Page ID and Message - JSON
 */
exports.page_update_put = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id || !body.url || !body.head_title || !body.head_description || !body.text_title || !body.text_paragraph) {
            throw new CustomError(400, "Invalid Parameter");
        }
        const images = req.files;
        let imageIds = body.image_ids;
        let noOfRemovals;

        const imageResults = await Image.getImagesOfPage(id);
        if (imageResults.length === 0) {
            throw new CustomError(400, "No records found");
        }
        if (!imageIds) {
            noOfRemovals = 0;
        } else {
            imageIds = imageIds.split(',');
            noOfRemovals = imageIds.length;
            if (!imageResults.some((img) => imageIds.includes(img.id.toString()))) {
                throw new CustomError(400, "Invalid image ID");
            }
        }
        console.log("Image IDs", imageIds)

        const noOfExistingImages = imageResults.length;
        const newOverallAdditionOfImages = images.length - noOfRemovals;
        const noOfImagesAfterUpdate = noOfExistingImages + newOverallAdditionOfImages;

        console.log("Number of Existing Images: " + noOfExistingImages);
        console.log("Number of Additions: " + images.length);
        console.log("Number of removals: " + noOfRemovals);
        console.log("Number of Images after update: " + noOfImagesAfterUpdate);

        const pageData = {
            id: id,
            url: body.url,
            head_title: body.head_title,
            head_description: body.head_description,
            text_title: body.text_title,
            text_paragraph: body.text_paragraph
        }
        const page = await Page.updatePageById(pageData);

        const payload = {
            page_id: id,
            message: `Update page successful with ID ${id}`
        }

        if (noOfImagesAfterUpdate > maxImages || noOfImagesAfterUpdate < 1) {
            payload.warning = "Skipped image updates as they fail minimum / maximum criteria";
            return res.status(200).send({ ...payload });
        }

        if (imageIds && noOfRemovals > 0) {
            await Image.deleteSpecificImagesOfPage(id, imageIds);
        }
        if (images && images.length > 0) {
            await Image.addImages(id, images);
        }


        return res.status(200).send({ ...payload });
    } catch (error) {
        next(error);
    }

}

/**
 * @function page_delete_delete
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description delete a specific page and all associated images
 * @return {Object} 200 - Object with Message - JSON
 */
exports.page_delete_delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            throw new CustomError(400, "Invalid Parameter");
        }
        await Image.deleteImagesOfPage(id);
        await Page.deletePageById(id);
        return res.status(200).send({ message: "Delete successful" })
    } catch (error) {
        next(error);
    }

}

/**
 * @function page_image_delete_delete
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 * @description delete a specific image associated with a specific page
 * @return {Object} 200 - Object with Message - JSON
 */
exports.page_image_delete_delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const imageId = req.params.image_id;
        if (!id || !imageId) {
            throw new CustomError(400, "Invalid Parameter");
        }
        const imageResults = await Image.getImagesOfPage(id);
        if (imageResults.length === 0) {
            throw new CustomError(400, "No records found");
        }
        if (!imageResults.some((img) => img.id == imageId)) {
            throw new CustomError(400, "Invalid image ID");
        }
        const noOfExistingImages = imageResults.length;
        const noOfImagesAfterRemoval = noOfExistingImages - 1;
        if (noOfImagesAfterRemoval < 1) {
            throw new CustomError(400, "Delete unsuccessful. Threshold reached");
        }
        await Image.deleteSpecificImagesOfPage(id, [imageId]);
        return res.status(200).send({ message: "Delete successful" })
    } catch (error) {
        next(error);
    }
}

