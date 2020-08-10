const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../middlewares/extractToken');

router.get('/:id/tracks', extractToken, async (req, res) => {
  functions.logger.info("Start Spoti User Tracks From Playlist!", { structuredData: true });

  const { id: playlistId } = req.params;
  const { limit, offset } = req.query;
  const token = req.accessToken;
  functions.logger.info(`playluist ${token}`, { structuredData: true });

  const response = await nodeFetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
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