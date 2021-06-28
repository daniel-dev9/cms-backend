/**
 * @function errorCodesHandler
 * @summary custom error handler
 * @param  {Errback} err
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const errorCodesHandler = (err, req, res, next) => {
    if (! err) {
        return next();
    }
    console.log(err);
    let statusCode=500;
    if(err.statusCode){
       statusCode=err.statusCode;
    }
    const errObj = {
       error:err.message?err.message:"Something went wrong",
       statusCode:statusCode
    }
    return res.status(statusCode).send({...errObj});
 }

 /**
 * @exports CustomErrorHandler
 */
 module.exports = errorCodesHandler;