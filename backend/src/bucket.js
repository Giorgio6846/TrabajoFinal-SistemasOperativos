const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'GKbd80ab6f1f5d5fee552d57b2',
  secretAccessKey: 'd3715a80b2f284b1c24a7d2ef7d8ddb6d5c39d9c56d5ec01a1b24a4af3feb393',
  region: 'garage',
  endpoint: 'http://garage:3900'
});
