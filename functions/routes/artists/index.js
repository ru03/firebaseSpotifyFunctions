const albumsByArtist = require('./albumsByArtist');
const artist = require('./artist');
const relatedArtist = require('./relatedArtist');
const topTracks = require('./topTracks');
const router = require('express').Router();

router.use([albumsByArtist, artist, relatedArtist, topTracks]);

module.exports = router;