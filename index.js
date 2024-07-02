if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const cors = require('cors');

const corsOption = { 
    origin: ALLOWED_ORIGINS
}

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use('/films', collectionFilms)
app.use('/series', collectionSeries)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Service Content listening on port ${PORT}`)
})