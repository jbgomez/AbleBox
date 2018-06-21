const s3BucketInfo = {
  bucketName: process.env.BUCKET_NAME || 'BUCKET_NAME',
  accessKeyId: process.env.ACCESS_KEY_ID || 'ACCESS_KEY_ID',
  secretAccessKey: process.env.SECRET_ACCESS_KEY || 'SECRET_ACCESS_KEY'
};

module.exports = s3BucketInfo;
