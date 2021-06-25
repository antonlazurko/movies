const BASE_URL = 'https://api.themoviedb.org/3';
const AUTH_KEY = 'd66f8875c56322c0e6582f80570eea14';
type TMovie = { id: string, name: string, title: string,poster_path:string,release_date:string }

type TFetchMoviesByQuery = (movieQuery: string, queryPage: number)=>Promise<{results:TMovie[]}>;
async function fetchMovies(url = '') {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}
export function fetchPopularMovies() {
  return fetchMovies(`${BASE_URL}/trending/all/day?api_key=${AUTH_KEY}`);
}
export const fetchMoviesByQuery:TFetchMoviesByQuery=(movieQuery, queryPage)=> {
   return fetchMovies(
    `${BASE_URL}/search/movie?api_key=${AUTH_KEY}&query=${movieQuery}&page=${queryPage}`,
  );
}
export function fetchMovieDetails(movieId:string) {
  return fetchMovies(`${BASE_URL}/movie/${movieId}?api_key=${AUTH_KEY}`);
}
export function fetchMovieCast(movieId:string) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${AUTH_KEY}`,
  );
}
export function fetchMovieReviews(movieId:string) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${AUTH_KEY}`,
  );
}
