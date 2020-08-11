const album = require('./album');
const tracksByAlbum = require('./tracksByAlbum');
const router = require('express').Router();

router.use([album, tracksByAlbum]);

module.exports = router;