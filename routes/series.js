const express = require('express');
const router = express.Router();
const getSerie = require('../controllers/seriesController');

router.get('/info/:seriesId', getSerie.getSerieInfoById)
router.get('/video/:seriesId', getSerie.getSeriesVideoById)
router.get('/providers/:seriesId', getSerie.getSeriesProvidersById)
router.get('/search/:keywords', getSerie.searchSerie)
router.get('/genres', getSerie.getSeriesGenre)
router.get('/providers', getSerie.getProviders)
router.get('/', getSerie.getSeries)

module.exports = router;