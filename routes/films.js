const express = require('express')
const getFilm = require('../controllers/filmsController')

const router = express.Router()

router.get('/', getFilm.getAllFilms)
router.get('/genres/:genreId', getFilm.getFilmGenreById)
router.get('/info/:filmsId', getFilm.getFilmInfoById)
router.get('/video/:filmsId', getFilm.getFilmVideoById)
router.get('/providers/:filmsId', getFilm.getFilmProvidersById)
router.get('/search/:keywords', getFilm.searchFilm)
router.get('/genres', getFilm.getFilmGenre)
router.get('/genres/:genreId/search/:keywords/', getFilm.searchFilmGenre)
router.get('/providers', getFilm.getProviders)
router.get('/providers/:providerId/genres/:genreId', getFilm.getFilmWithProvidersAndGenres)


module.exports = router