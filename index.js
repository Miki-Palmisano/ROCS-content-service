if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/films', collectionFilms)
app.use('/series', collectionSeries)

app.listen(3001, () => {
    console.log(`Service Content listening on port ${PORT}`)
})