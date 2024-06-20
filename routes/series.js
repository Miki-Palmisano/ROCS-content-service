const express = require('express');
const router = express.Router();
const { getAllSeries, getSeriesGenreById } = require('../controllers/seriesController');

router.get('/', getAllSeries);
router.get('/genres/:genreId', getSeriesGenreById)

module.exports = router;