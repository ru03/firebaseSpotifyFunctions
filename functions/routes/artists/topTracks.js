const router = require('express').Router();
const functions = require('firebase-functions');
const nodeFetch = require('node-fetch');
const extractToken = require('../../middlewares/extractToken');
const i18nCountries = require('i18n-iso-countries');

router.get('/:id/top-tracks', extractToken, async (req, res) => {
  functions.logger.info("Artist Top Tracks!", { structuredData: true });
  const id = req.params.id;
  const { country = 'es' } = req.query
  const token = req.accessToken;

  if(!i18nCountries.isValid(country) || country.length > 2) {
    functions.logger.error(`Country code: ${country}`, { structuredData: true });
    res.status(400).send({
      error: {
        message: 'Invalid market code'
      }
    });
    return
  }

  const response = await nodeFetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=${country}`, {
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
