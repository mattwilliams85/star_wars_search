const SWAPI_URL = 'https://swapi.dev/api/films/';

export const fetchMovieList = async function (query: string) {
  try {
    const results = await fetch(`${SWAPI_URL}?search=${query}`);
    const body = await results.json();
    body.query = query;

    return body;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMovieDetails = async function (episodeId: string | undefined) {
  try {
    const results = await fetch(`${SWAPI_URL}/${episodeId}`);
    const body = await results.json();

    return body;
  } catch (err) {
    console.error(err);
  }
};
