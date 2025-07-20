export const API_KEY = process.env.REACT_APP_API_KEY;
export const ENDPOINT = 'https://api.themoviedb.org/3'

if (!API_KEY) {
  throw new Error('API key is not set. Define REACT_APP_API_KEY in .env file.');
}

export const buildApiUrl = (relativePath, params = {}) => {
    const cleanPath = relativePath.replace(/^\/+/, '');
    const url = new URL(`${ENDPOINT}/${cleanPath}`);
    url.searchParams.set('api_key', API_KEY);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }

  return url.toString()
}

export const ENDPOINT_DISCOVER = buildApiUrl('/discover/movie', {
  sort_by: 'vote_count.desc',
})

export const ENDPOINT_SEARCH = (query) =>
  buildApiUrl('search/movie', { query })

export const ENDPOINT_MOVIE = (id) =>
  buildApiUrl(`movie/${id}`, { append_to_response: 'videos' })
