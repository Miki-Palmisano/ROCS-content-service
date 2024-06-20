const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY;

const getAllSeries = async (req, res) => { 
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/tv',
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
        console.log(response.data.results);
        const series = response.data.results.map((serie) => {
            return {
                type: "serie", 
                id: serie.id, 
                title: serie.name, 
                description: serie.overview, 
                year: serie.first_air_date, 
                genres: serie.genre_ids,
                rating: serie.vote_average, 
                img: "https://image.tmdb.org/t/p/w780" + serie.poster_path,
            };
        });
        res.json(series);
    } catch (error) {
        console.error(error);
    }
}

const getSeriesGenreById = async (req, res) => { 
    try {
      const genreResponse = await axios.request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv',
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
      const genreSeries = genreResponse.data.results.map((serie) => {
        return {
            type: "movie", 
            id: serie.id, 
            title: serie.title, 
            description: serie.overview, 
            year: serie.releaseYear, 
            genres: serie.genre_ids,
            rating: serie.vote_average, 
            img: "https://image.tmdb.org/t/p/w780" + serie.poster_path,
        };
      });
      res.json(genreSeries);
    }catch(error){
      console.error(error);
    }
  }

module.exports = {
    getAllSeries,
    getSeriesGenreById
}