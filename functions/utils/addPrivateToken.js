const functions = require('firebase-functions');
const env = require(`../../config/${functions.config().spotify.env}.json`);

const addPrivateToken = () => Buffer.from(`${env.clientKey}:${env.privateKey}`).toString('base64');

module.exports = addPrivateToken;