import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/movieCollection.scss'

function MovieCollection({
  selector,
  clearAction,
  title,
  emptyIcon,
  emptyMessage,
  clearLabel,
  testId,
  viewTrailer
}) {
  const items = useSelector(selector)
  const dispatch = useDispatch()
  const hasItems = items.length > 0

  return (
    <div className="movie-collection" data-testid={testId}>
      {hasItems ? (
        <>
          <h6 className="header">{title}</h6>
          <div className="row">
            {items.map(m => (
              <Movie key={m.id} movie={m} viewTrailer={viewTrailer} />
            ))}
          </div>
          <footer className="text-center">
            <button className="btn btn-primary" onClick={() => dispatch(clearAction())}>
              {clearLabel}
            </button>
          </footer>
        </>
      ) : (
        <div className="text-center empty-cart">
          <i className={`bi ${emptyIcon}`} />
          <p>{emptyMessage}</p>
          <p>Go to <Link to="/">Home</Link></p>
        </div>
      )}
    </div>
  )
}

export function Starred({ viewTrailer }) {
  return (
    <MovieCollection
      selector={s => s.starred.starredMovies}
      clearAction={starredSlice.actions.clearAllStarred}
      title="Starred movies"
      emptyIcon="bi-star"
      emptyMessage="There are no starred movies."
      clearLabel="Remove all starred"
      testId="starred"
      viewTrailer={viewTrailer}
    />
  )
}

export function WatchLater({ viewTrailer }) {
  return (
    <MovieCollection
      selector={s => s.watchLater.watchLaterMovies}
      clearAction={watchLaterSlice.actions.remveAllWatchLater}
      title="Watch Later List"
      emptyIcon="bi-heart"
      emptyMessage="You have no movies saved to watch later."
      clearLabel="Empty list"
      testId="watch-later"
      viewTrailer={viewTrailer}
    />
  )
}
