/**
 * Module imports
 */
const express = require('express');
const router = express.Router();

/**
 * File Imports
 */
const pageController = require('../controllers/page.controller');

/**
 * GET /
 * @description sends a hello world response
 * @summary endpoint to check whether server is running
 * @return {String} status - String
 */
router.get('/', (req, res) => {
    res.send('Hello World');
});

/**
 * GET /page
 * @description get all pages
 * @summary returns a list of all available pages
 * @return {Array} 200 - Array of Page Objects - JSON
 */
router.get('/page', pageController.pages_list);

/**
 * GET /page/:id
 * @description get specific page
 * @summary returns details of a specific page and images associated with it
 * @param {String} id - ID of a page
 * @return {Object} 200 - Page Object with an Array of Images - JSON
 */
router.get('/page/:id', pageController.page_detail);

module.exports = router;