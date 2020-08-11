const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');
const validatePagination = require('../../utils/validatePagination');

// TODO: ADD Market query param
router.get('/:id/tracks', extractToken, async (req, res) => {
  functions.logger.info("Artist!", { structuredData: true });
  const id = req.params.id;
  const token = req.accessToken;
  const { limit = 5, offset = 0 } = req.query;

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

  const response = await nodeFetch(`https://api.spotify.com/v1/albums/${id}/tracks?limit=${limit}&offset=${offset}`, {
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
