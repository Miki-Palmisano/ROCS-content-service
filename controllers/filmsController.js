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
          description: film.overview,
          release_date: film.release_date,
          rating: film.vote_average,
          production_companies: film.production_companies,
          img: "https://image.tmdb.org/t/p/w780"+film.poster_path,
          tagline: film.tagline,
          status: film.status
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
    res.json(Object.keys(videoResponse.data.results).length === 0 ? {key: null, site: null} : {key: videoResponse.data.results[0].key, site: videoResponse.data.results[0].site});
  }catch(error){
    console.error(error);
  }
}

const getFilmProvidersById = async (req, res) => {
  try {
    const providersResponse = await axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${req.params.filmsId}/watch/providers`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    });

    res.json(
      Object.keys(providersResponse.data.results).length === 0 || !providersResponse.data.results.IT
      ? null
      : {
          flatrate: providersResponse.data.results.IT.flatrate || null,
          rent: providersResponse.data.results.IT.rent || null,
          buy: providersResponse.data.results.IT.buy || null
      }
    );
  }
  catch(error){
    console.error(error);
  }
}

const searchFilm = async (req, res) => {
  try {
    const searchResponse = await axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        query: req.params.keywords,
        watch_region: 'IT',
        language: 'it-IT',
        sort_by: 'popularity'
      }
    });
    const films = searchResponse.data.results.map((film) => {
      return {
          type: "films", 
          id: film.id, 
          title: film.title, 
          description: film.overview, 
          year: film.releaseYear, 
          genres: film.genre_ids,
          rating: film.vote_average, 
          img: film.poster_path === null ? null : "https://image.tmdb.org/t/p/w780" + film.poster_path,
      };
    });
    res.json(films);
  }
  catch(error){
    console.error(error);
  }
}

const getFilmGenre = async (req, res) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: 'https://api.themoviedb.org/3/genre/movie/list',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        language: 'it-IT'
      }
    });
    res.json(response.data.genres.map((genre) => { return {id: genre.id, name: genre.name}; }));
  }
  catch(error){
    console.error(error);
  }
}

const searchFilmGenre = async (req, res) => {
  try {
    const searchResponse = await axios.request({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      },
      params: {
        query: req.params.keywords,
        watch_region: 'IT',
        language: 'it-IT',
        sort_by: 'popularity'
      }
    });
    const films = searchResponse.data.results.map((film) => {
      return{
          type: "films", 
          id: film.id, 
          title: film.title, 
          description: film.overview, 
          year: film.releaseYear, 
          genres: film.genre_ids,
          rating: film.vote_average, 
          img: film.poster_path === null ? null : "https://image.tmdb.org/t/p/w780" + film.poster_path,
      };
    });
    res.json(films.filter((film) => film.genres.includes(parseInt(req.params.genreId))));
  }
  catch(error){
    console.error(error);
  }
}


module.exports = {
    getAllFilms,
    getFilmGenreById,
    getFilmGenre,
    getFilmInfoById,
    getFilmVideoById,
    getFilmProvidersById,
    searchFilm,
    searchFilmGenre
}