const keys = {
  accessKeyId: process.env.ACCESS_KEY_ID || ACCESS_KEY_ID;,
  secretAccessKey: process.env.SECRET_ACCESS_KEY || SECRET_ACCESS_KEY,
  region: process.env.REGION || REGION
};

exports.keys = keys;
