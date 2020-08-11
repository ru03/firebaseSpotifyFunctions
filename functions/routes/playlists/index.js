const tracksFromPlaylist = require('./tracksFromList');
const userList = require('./userLists');
const router = require('express').Router();

router.use([
  userList,
  tracksFromPlaylist
]);

module.exports = router;