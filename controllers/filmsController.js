const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY;

const getAllFilms = async (req, res) => {
    try {
        const response = await axios.request({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`
          }, 
          params: {
            //with_watch_providers: '8|9', // Netflix and Amazon Prime
            watch_region: 'IT',
            language: 'it-IT',
            sort_by: 'popularity.desc',
          }
      });
        const films = response.data.results.map((film) => {
            return {
                type: "films", 
                id: film.id, 
                title: film.title, 
                description: film.overview, 
                year: film.releaseYear, 
                genres: film.genre_ids,
                rating: film.vote_average, 
                img: "https://image.tmdb.org/t/p/w780" + film.poster_path,
            };
        });
        res.json(films);
    } catch (error) {
        console.error(error);
    }
}

const getFilmGenreById = async (req, res) => { 
  try {
    const genreResponse = await axios.request({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }, 
      params: {
        //with_watch_providers: '8|9', // Netflix and Amazon Prime
        watch_region: 'IT',
        language: 'it-IT',
        sort_by: 'popularity',
        with_genres: req.params.genreId
      }
    });
    const Genrefilms = genreResponse.data.results.map((film) => {
      return {
          type: "films", 
          id: film.id, 
          title: film.title, 
          description: film.overview, 
          year: film.releaseYear, 
          genres: film.genre_ids,
          rating: film.vote_average, 
          img: "https://image.tmdb.org/t/p/w780" + film.poster_path,
      };
    });
    res.json(Genrefilms);
  }catch(error){
    console.error(error);
  }
}

const getFilmInfoById = async (req, res) => {
  try {
    const infoResponse = await axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.filmsId}`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }, 
      params: {
        watch_region: 'IT',
        language: 'it-IT',
        sort_by: 'popularity_desc'
      }
    });
    const film = infoResponse.data;
    const infoFilms = {
          type: "films",
          id: film.id,
          title: film.title,
          genres: film.genres,
          budget: film.budget,
          description: film.overview,
          release_date: film.release_date,
          rating: film.vote_average,
          production_companies: film.production_companies,
          img: "https://image.tmdb.org/t/p/w780"+film.poster_path,
          tagline: film.tagline
      };
    res.json(infoFilms);
  }catch(error){
    console.error(error);
  }

}

const getFilmVideoById = async (req, res) => {
  try {
    const videoResponse = await axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.filmsId}/videos`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }, 
      params: {
        watch_region: 'IT',
        language: 'it-IT',
        sort_by: 'popularity'
      }
    });
    console.log(videoResponse.data.results)
    Object.keys(videoResponse.data.results).length === 0 ? res.json({key: null, site: null}) : res.json({key: videoResponse.data.results[0].key, site: videoResponse.data.results[0].site});
  }catch(error){
    console.error(error);
  }
}


module.exports = {
    getAllFilms,
    getFilmGenreById,
    getFilmInfoById,
    getFilmVideoById
}