const express = require('express')
const { getAllFilms, getFilmGenreById, getFilmInfoById, getFilmVideoById } = require('../controllers/filmsController')

const router = express.Router()

router.get('/', getAllFilms)
router.get('/genres/:genreId', getFilmGenreById)
router.get('/info/:filmsId', getFilmInfoById)
router.get('/video/:filmsId', getFilmVideoById)

module.exports = router