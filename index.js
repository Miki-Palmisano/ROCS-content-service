if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')
const cors = require('cors');
const PORT = process.env.PORT || 3001;

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/content/films', collectionFilms)
app.use('/content/series', collectionSeries)

app.listen(PORT, () => {
    console.log("Service Content listening on port 3001")
})