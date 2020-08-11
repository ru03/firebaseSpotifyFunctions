const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require("cors")
const albums = require('./routes/albums');
const artists = require('./routes/artists');
const auth = require('./routes/auth');
const playlist = require('./routes/playlists');
const refresh = require('./routes/refreshToken');
const user = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }))

app.use('/albums', albums)
app.use('/artists', artists)
app.use('/auth', auth)
app.use('/me', user)
app.use('/playlist', playlist)
app.use('/refresh', refresh)

exports.api = functions.https.onRequest(app);