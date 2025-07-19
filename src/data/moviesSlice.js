import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: {
      results: [],
      page: 1,
      total_pages: 1
    },
    fetchStatus: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = 'loading'
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error'
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { page, results, total_pages } = action.payload

        if (page > 1) {
          const merged = [...state.movies.results, ...results]
          const uniqueResults = merged.filter(
            (movie, idx, arr) =>
              arr.findIndex(m => m.id === movie.id) === idx
          )

          state.movies = {
            results: uniqueResults,
            page,
            total_pages
          }
        } else {
          state.movies = {
            results,
            page,
            total_pages
          }
        }

        state.fetchStatus = 'success'
      })
  }
})

export default moviesSlice
