import { useState, useMemo, useCallback } from 'react'
import { Link, NavLink, useNavigate, createSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash.debounce'
import { fetchMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'

import '../styles/header.scss'

const Header = () => {
  const { starredMovies } = useSelector((state) => state.starred)
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(ENDPOINT_SEARCH(query)))
      const searchParams = createSearchParams({ search: query })
      navigate({ pathname: '/', search: searchParams.toString() })
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      navigate('/')
    }
  }

  const searchMovies = useCallback((query) => {
    getSearchResults(query)
  }, [navigate])

  const debouncedSearch = useMemo(() => {
    console.log('debounce renders')
    return debounce(searchMovies, 500)
  }, [searchMovies])
  
  const handleChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value)
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies('')}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
            <i className="bi bi-star-fill bi-star-fill-white" />
            <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" onClick={(e) => searchMovies('')} className="search-link" >
          <input type="search" data-testid="search-movies"
            value={inputValue}
            onChange={handleChange}
            className="form-control rounded" 
            placeholder="Search movies..." 
            aria-label="Search movies" 
            aria-describedby="search-addon" 
            />
        </Link>            
      </div>      
    </header>
  )
}

export default Header
