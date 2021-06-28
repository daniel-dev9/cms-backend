/**
 * Module imports
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

/**
 * File Imports
 */
const indexRouter = require('./routes/index.route');
const adminRouter = require('./routes/admin.route');
const connection = require('./services/db');
const CustomError = require('./utils/errors/custom-error');
const errorCodesHandler = require('./utils/errors/custom-error-handler');

/**
 * Create Express application
 */
const app = express();

/**
 * Start the DB connection with pre-configured variables
 */
connection.getInstance();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

/**
 * Route - index router
 */
app.use('/', indexRouter);

/**
 * Route - admin router
 */
app.use('/admin', adminRouter);

/**
 * Invalid endpoints
 * @description throw an error
 * @summary throws a Custom Error with 404 status
 * @return {CustomError} 404 - Invalid Route - String
 */
app.use('*',(req,res)=>{
   throw new CustomError(404,"Invalid Route");
});

app.use()
/**
 * @param  {RequestHandler} errorCodesHandler
 */
app.use(errorCodesHandler);

/**
 * Start express server
 */
const server = app.listen(process.env.PORT, () => {
   const host = server.address().address
   const port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
 