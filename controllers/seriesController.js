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
                type: "series", 
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
            type: "series", 
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

const getSerieInfoById = async (req, res) => {
try {
    const infoResponse = await axios.request({
    method: 'GET',
    url: `https://api.themoviedb.org/3/tv/${req.params.seriesId}`,
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
    const serie = infoResponse.data;
    const infoSerie = {
        type: "series",
        id: serie.id,
        title: serie.name,
        genres: serie.genres,
        description: serie.overview,
        release_date: serie.first_air_date+'/'+serie.last_air_date,
        rating: serie.vote_average,
        creator: serie.created_by,
        seasons: serie.number_of_seasons,
        episodes: serie.number_of_episodes,
        episodes_duration: serie.episode_run_time,
        production_companies: serie.production_companies,
        img: "https://image.tmdb.org/t/p/w780"+serie.poster_path,
        tagline: serie.tagline,
        status: serie.status
    };
    res.json(infoSerie);
    }catch(error){
        console.error(error);
    }
}

const getSeriesVideoById = async (req, res) => {
    try {
        const videoResponse = await axios.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${req.params.seriesId}/videos`,
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
    }
    catch(error){
        console.error(error);
    }
}

const getSeriesProvidersById = async (req, res) => {
    try {
        const providersResponse = await axios.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/${req.params.seriesId}/watch/providers`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }, 
            params: {
                watch_region: 'IT',
                language: 'it-IT',
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

const searchSerie = async (req, res) => {
    try {
        const searchResponse = await axios.request({
            method: 'GET',
            url: `https://api.themoviedb.org/3/search/tv`,
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
        const series = searchResponse.data.results.map((serie) => {
            return {
                type: "series", 
                id: serie.id, 
                title: serie.name, 
                description: serie.overview, 
                year: serie.first_air_date, 
                genres: serie.genre_ids,
                rating: serie.vote_average, 
                img: serie.poster_path === null ? null : "https://image.tmdb.org/t/p/w780" + serie.poster_path,
            };
        });
        res.json(series);
    }
    catch(error){
        console.error(error);
    }
}

const getSeriesGenre = async (req, res) => {
    try {
        const genreResponse = await axios.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/tv/list',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            }, 
            params: {
                language: 'it-IT'
            }
        });
        res.json(genreResponse.data.genres.map((genre) => { return {id: genre.id, name: genre.name}; }));
    }
    catch(error){
        console.error(error);
    }
}

const searchSeriesGenre = async (req, res) => {
    try {
      const searchResponse = await axios.request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/search/tv`,
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
      const series = searchResponse.data.results.map((serie) => {
        return{
            type: "series", 
            id: serie.id, 
            title: serie.title, 
            description: serie.overview, 
            year: serie.releaseYear, 
            genres: serie.genre_ids,
            rating: serie.vote_average, 
            img: serie.poster_path === null ? null : "https://image.tmdb.org/t/p/w780" + serie.poster_path,
        };
      });
      res.json(series.filter((serie) => serie.genres.includes(parseInt(req.params.genreId))));
    }
    catch(error){
      console.error(error);
    }
  }

  const getProviders = async (req, res) => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/watch/providers/tv',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        params: {
          watch_region: 'IT',
          language: 'it-IT'
        }
      });
      res.json(response.data.results.map((provider) => { return {id: provider.provider_id, name: provider.provider_name, logo: "https://image.tmdb.org/t/p/w780"+provider.logo_path}; }));
    }
    catch(error){
      console.error(error);
    }
  }

  const getSeriesTwoGenres = async (req, res) => {
    try {
      const genreResponse = await axios.request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/tv',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        }, 
        params: {
          watch_region: 'IT',
          language: 'it-IT',
          with_genres: req.params.genreId + "," + req.params.secondGenreId
        }
      });
      const Genreseries = genreResponse.data.results.map((serie) => {
        return {
            type: "series", 
            id: serie.id, 
            title: serie.title, 
            description: serie.overview, 
            year: serie.releaseYear, 
            genres: serie.genre_ids,
            rating: serie.vote_average, 
            img: "https://image.tmdb.org/t/p/w780" + serie.poster_path,
        };
      });
      res.json(Genreseries);
    }catch(error){
      console.error(error);
    }
  }

module.exports = {
    getAllSeries,
    getSeriesGenreById,
    getSeriesGenre,
    getSerieInfoById,
    getSeriesVideoById,
    getSeriesProvidersById,
    searchSerie,
    searchSeriesGenre,
    getProviders,
    getSeriesTwoGenres
}