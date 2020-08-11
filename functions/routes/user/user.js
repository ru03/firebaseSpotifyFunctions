const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');

router.get('/', extractToken, async (req, res) => {
  functions.logger.info("Start Spoti User!", {structuredData: true});
  const token = req.accessToken;

  const response = await nodeFetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  res.send(data);
});

module.exports = router;
