const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');

// TODO: ADD Market query param
router.get('/:id', extractToken, async (req, res) => {
  functions.logger.info("Artist!", { structuredData: true });
  const id = req.params.id;
  const token = req.accessToken;

  const response = await nodeFetch(`https://api.spotify.com/v1/albums/${id}`, {
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
