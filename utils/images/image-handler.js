/**
 * Module Imports
 */
const S3 = require('aws-sdk/clients/s3')

/**
 * Initialize values
 */
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

/**
 * Constructing S3 object
 */
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

/**
 * @function uploadImage - upload image to S3 Bucket
 * @param  {String} filename - Key of image to be stored in the bucket - Filename
 * @param  {Buffer} file - Raw buffer of Image
 * @returns {Promise} 
 */
const uploadImage = (filename, file) => {
    const uploadParams = {
        Bucket: bucketName,
        Key: filename,
        Body: file
    }

    return s3.upload(uploadParams).promise();
}

/**
 * @function deleteImages - delete images from S3 Bucket
 * @param  {Array} files - Array of files to be deleted
 * @returns {Promise} 
 */
const deleteImages = async (files) => {
    const delFiles = [];
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const imgFound = await checkImage(file.Key);
        if (imgFound) {
            delFiles.push(file);
        }
    }

    const deleteParam = {
        Bucket: bucketName,
        Delete: {
            Objects: delFiles
        }
    };
    return s3.deleteObjects(deleteParam).promise();
}

/**
 * @function checkImage - check whether image exists in S3 Bucket
 * @param  {String} key - Key of image
 * @returns {Boolean} 
 */
const checkImage = async (key) => {
    const verifyParams = {
        Bucket: bucketName,
        Key: key
    }
    try {
        await s3.headObject(verifyParams).promise()
        console.log("File Found in S3");
        return true;
    } catch (error) {
        console.log("File not Found ERROR : " + error.code)
        return false;
    }

}

/**
 * @exports uploadImage, deleteImages, checkImage
 */
module.exports = { uploadImage, deleteImages, checkImage }