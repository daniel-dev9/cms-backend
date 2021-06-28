/**
 * Module imports
 */
const express = require('express');
const router = express.Router();
const multer  = require('multer')

/**
 * Initialize values
 */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const maxImages = process.env.MAX_IMGS;

/**
 * File Imports
 */
const pageController = require('../controllers/page.controller');

/**
 * GET /admin
 * @description redirect request to /admin/page
 */
router.get('/', (req,res)=>{
    res.redirect('/admin/page');
});

/**
 * GET /admin/page
 * @description get all pages
 * @summary returns a list of all available pages
 * @return {Array} 200 - Array of Page Objects - JSON
 */
router.get('/page', pageController.pages_list);


/**
 * GET /admin/page/:id
 * @description get specific  page
 * @summary returns details of a specific page and images associated with it
 * @param {String} id - ID of a page
 * @return {Object} 200 - Page Object with an Array of Images - JSON
 */
router.get('/page/:id',pageController.page_detail);


/**
 * POST /admin/page
 * @description create a new page with images
 * @summary returns the ID of the page created
 * @param {String} request.body.url - URL of page
 * @param {String} request.body.head_title - Heading Title of page
 * @param {String} request.body.head_description - Heading Description of page
 * @param {String} request.body.text_title - Text Title of page
 * @param {String} request.body.text_paragraph - Text Paragraph of page
 * @param {File} request.body.photos - Image of page
 * @return {Object} 200 - Object with Page ID and Message - JSON
 */
router.post('/page',upload.array('photos', maxImages),pageController.page_create_post);

/**
 * PUT /admin/page/:id
 * @description update existing page with images
 * @summary returns the ID of the page created
 * @param {String} request.body.url - URL of page
 * @param {String} request.body.head_title - Heading Title of page
 * @param {String} request.body.head_description - Heading Description of page
 * @param {String} request.body.text_title - Text Title of page
 * @param {String} request.body.text_paragraph - Text Paragraph of page
 * @param {File} request.body.photos - Image of page (Optional)
 * @return {Object} 200 - Object with Page ID and Message - JSON
 */
router.put('/page/:id',upload.array('photos', maxImages),pageController.page_update_put);

/**
 * DELETE /admin/page/:id
 * @description delete a specific page and all associated images
 * @summary returns a success message
 * @param {String} id - ID of Page to be deleted
 * @return {Object} 200 - Object with Message - JSON
 */
router.delete('/page/:id',pageController.page_delete_delete);


/**
 * DELETE /admin/page/:id/image/:id
 * @description delete a specific image associated with a specific page
 * @summary returns a success message
 * @param {String} id - ID of Page 
 * @param {String} image_id - ID of Image
 * @return {Object} 200 - Object with Message - JSON
 */
router.delete('/page/:id/image/:image_id',pageController.page_image_delete_delete);

module.exports = router;