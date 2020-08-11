const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const { URLSearchParams } = require('url');
const addPrivateToken = require('../../utils/addPrivateToken');

router.post('/', async (req, res) => {
  functions.logger.info("Start Spoti Refresh!", { structuredData: true });

  const tokenBase64 = addPrivateToken();
  const { token } = req.body;

  if (tokenBase64) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', token);
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
  } else {
    res.status(404).json({ message: 'Bad Request. Token missing' });
  }
});

module.exports = router;
