const express = require('express')
const getFilm = require('../controllers/filmsController')

const router = express.Router()

router.get('/', getFilm.getAllFilms)
router.get('/genres/:genreId', getFilm.getFilmGenreById)
router.get('/info/:filmsId', getFilm.getFilmInfoById)
router.get('/video/:filmsId', getFilm.getFilmVideoById)
router.get('/providers/:filmsId', getFilm.getFilmProvidersById)

module.exports = router