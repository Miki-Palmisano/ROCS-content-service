if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const collectionFilms = require('./routes/films')
const collectionSeries = require('./routes/series')
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
const cors = require('cors');
const axios = require('axios');

const corsOption = { 
    origin: ALLOWED_ORIGINS
}

const app = express();

app.use(express.json());
app.use(cors(corsOption));

app.use('/state', (req, res) => {
    axios.get('https://api.themoviedb.org/3/discover/movie', {
        headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    }).then(response => {
        console.log('Server is running');
        res.status(200).json({ message: 'Server is running', data: response.data });
    }).catch(error => {
        console.log('Server is not running');
        res.status(500).json({ message: 'Server is not running', error: error });
    });
});

app.use('/films', collectionFilms)
app.use('/series', collectionSeries)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Service Content listening on port ${PORT}`)
})