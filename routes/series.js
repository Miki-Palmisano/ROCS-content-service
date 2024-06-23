const express = require('express');
const router = express.Router();
const getSerie = require('../controllers/seriesController');

router.get('/', getSerie.getAllSeries);
router.get('/genres/:genreId', getSerie.getSeriesGenreById)
router.get('/info/:seriesId', getSerie.getSerieInfoById)
router.get('/video/:seriesId', getSerie.getSeriesVideoById)
router.get('/providers/:seriesId', getSerie.getSeriesProvidersById)

module.exports = router;