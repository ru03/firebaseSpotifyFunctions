const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');
const validatePagination = require('../../utils/validatePagination');

router.get('/', extractToken, async (req, res) => {
  functions.logger.info("Spoti User Playlists", { structuredData: true });
  const { limit = 10, offset = 0 } = req.query;
  const token = req.accessToken;

  for (let number of [limit, offset]) {
    if (number === null || !validatePagination(number)) {
      functions.logger.error(`Limit: ${limit} - Offset: ${offset}`, { structuredData: true });
      res.status(400).send({
        error: {
          message: 'Pagination must contains integer numbers'
        }
      });
      return
    }
  }

  const response = await nodeFetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  const data = await response.json();
  res.send(data);
});

module.exports = router;
