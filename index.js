require('dotenv').config();
const express = require('express');
const axios = require('axios');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')

const app = express();

app.use(express.json());
app.use('/films', collectionFilms)
app.use('/series', collectionSeries)

app.listen(3001, () => {
    console.log("Service Content listening on port 3001")
})