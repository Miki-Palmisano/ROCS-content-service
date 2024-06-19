if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/content/films', collectionFilms)
app.use('/content/series', collectionSeries)

app.listen(PORT, () => {
    console.log(`Service Content listening on port ${PORT}`)
})