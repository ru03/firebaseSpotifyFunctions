const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const { URLSearchParams } = require('url');
const addPrivateToken = require('../../utils/addPrivateToken');

router.get('/', async (req, res) => {
  functions.logger.info("Start Spoti Auth!", {structuredData: true});
  const {code} = req.query;
  const tokenBase64 = addPrivateToken();
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000/authorization');
  
  const response = await nodeFetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${tokenBase64}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  const data = await response.json();

  functions.logger.info(data)
  res.send(data);
});

module.exports = router;