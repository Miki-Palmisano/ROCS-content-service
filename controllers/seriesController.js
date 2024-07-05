const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY;

const makeRequest = async (url, params) => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: url,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            params: params
        });
        return response.data.results.map((serie) => {
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
    }
    catch(error){
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
    const languageCodes = ['it', 'en', 'fr', 'es', 'de', 'ja', 'ko', 'pt', 'ru', 'zh'];
    let foundTrailer = false; 
    let trailer = { key: null, site: null };

    for (let i = 0; i < languageCodes.length && !foundTrailer; i++) {
        try {
            console.log(`Trying language ${languageCodes[i]}`)
            const videoResponse = await axios.request({
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${req.params.seriesId}/videos`,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${API_KEY}`
                }, 
                params: {
                    watch_region: 'IT',
                    language: languageCodes[i]
                }
            });
            if (videoResponse.data.results.length !== 0) {
                trailer = {
                    key: videoResponse.data.results[0].key,
                    site: videoResponse.data.results[0].site
                };
                foundTrailer = true;
            }
        }
        catch(error){
            console.error(error);
        }
    }

    res.json(trailer);
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
        const { genreId } = req.query;
        const response = await makeRequest('https://api.themoviedb.org/3/search/tv', {query: req.params.keywords});
        res.json( genreId ? response.filter((serie) => serie.genres.includes(parseInt(genreId))) : response);
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

const getSeries = async (req, res) => {
    try {
        const { providerId, genreId } = req.query;
        const params = {
            watch_region: 'IT',
            language: 'it-IT',
            sort_by: 'popularity.desc'
        };

        providerId ? params.with_watch_providers = providerId : null;
        genreId ? params.with_genres = genreId : null;

        const response = await makeRequest('https://api.themoviedb.org/3/discover/tv', params);
        res.json(response);
    }
    catch(error){
        console.error(error);
    }
}


module.exports = {
    getSeriesGenre,
    getSerieInfoById,
    getSeriesVideoById,
    getSeriesProvidersById,
    searchSerie,
    getProviders,
    getSeries
}