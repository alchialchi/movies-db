import { useEffect, useState } from 'react'
import { Routes, Route, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT_MOVIE } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import { Starred, WatchLater } from './components/MovieCollection'
import YouTubePlayer from './components/YoutubePlayer'

import './app.scss'

const App = () => {
  const { movies, fetchStatus } = useSelector((state) => state.movies)
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpen, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const baseUrl = searchQuery
    ? ENDPOINT_SEARCH(searchQuery)
    : ENDPOINT_DISCOVER
    const url = `${baseUrl}&page=${page}`
    dispatch(fetchMovies(url))
  }, [dispatch, searchQuery, page])

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = ENDPOINT_MOVIE(id)

    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    } else {
      setVideoKey(null)
    }
  }

  return (
    <div className="App">
      <Header/>

      <div className="container">
       {videoKey && isOpen && <YouTubePlayer videoKey={videoKey} onClose={() => setOpen(false)} />}
       {videoKey === null && (
        <div style={{ padding: '30px' }}>
          <h6>no trailer available. Try another movie</h6>
        </div>
       )}

        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer} fetchStatus={fetchStatus} loadMore={() => setPage(p => p + 1)} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
