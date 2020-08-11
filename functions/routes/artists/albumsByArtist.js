const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');
const validatePagination = require('../../utils/validatePagination');

const ALBUM_TYPES = ['album', 'single', 'compilation', 'appears_on'];

router.get('/:id/albums', extractToken, async (req, res) => {
  functions.logger.info("Albums by artist!", { structuredData: true });
  const id = req.params.id;
  const { limit = 5, offset = 0, album_type = 'album' } = req.query;
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
  
  const albumTypes = validateAlbumType(album_type.split(','))
  if (albumTypes.length === 0) {
    functions.logger.error(`Album_type: ${album_type}`, { structuredData: true });
    res.status(400).send({
      error: {
        message: 'Album_type must contains at least one of this values: album, single or compilation'
      }
    });
    return
  }

  const response = await nodeFetch(`https://api.spotify.com/v1/artists/${id}/albums?album_type=${albumTypes.join(',')}&limit=${limit}&offset=${offset}`, {
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

function validateAlbumType(types) {
  return types.filter(type => ALBUM_TYPES.includes(type.toLowerCase()));
}

module.exports = router;
