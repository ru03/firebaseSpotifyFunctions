const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const cors = require("cors")
const auth = require('./spotiAuth');
const refresh = require('./spotiRefreshToken');
const user = require('./spotiUser');
const playlist = require('./playlists');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }))

app.use('/playlist', playlist)
app.use('/auth', auth)
app.use('/me', user)
app.use('/refresh', refresh)

exports.api = functions.https.onRequest(app);