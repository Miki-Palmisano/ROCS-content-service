const express = require('express')
const { getAllFilms, getFilmGenreById } = require('../controllers/filmsController')

const router = express.Router()

router.get('/', getAllFilms)
router.get('/genres/:genreId', getFilmGenreById)

module.exports = router