const express = require('express')
const getFilm = require('../controllers/filmsController')

const router = express.Router()

router.get('/info/:filmsId', getFilm.getFilmInfoById)
router.get('/video/:filmsId', getFilm.getFilmVideoById)
router.get('/providers/:filmsId', getFilm.getFilmProvidersById)
router.get('/search', getFilm.searchFilm)
router.get('/genres', getFilm.getFilmGenre)
router.get('/providers', getFilm.getProviders)
router.get('/', getFilm.getFilms)


module.exports = router