const express = require('express');
const router = express.Router();
const getSerie = require('../controllers/seriesController');

router.get('/', getSerie.getAllSeries);
router.get('/genres/:genreId', getSerie.getSeriesGenreById)
router.get('/info/:seriesId', getSerie.getSerieInfoById)
router.get('/video/:seriesId', getSerie.getSeriesVideoById)
router.get('/providers/:seriesId', getSerie.getSeriesProvidersById)
router.get('/search/:keywords', getSerie.searchSerie)
router.get('/genres', getSerie.getSeriesGenre)
router.get('/genres/:genreId/search/:keywords/', getSerie.searchSeriesGenre)
router.get('/providers', getSerie.getProviders)
router.get('/filter/genres/:genreId/genres/:secondGenreId', getSerie.getSeriesTwoGenres)

module.exports = router;