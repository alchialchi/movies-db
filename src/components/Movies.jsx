import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, fetchStatus, loadMore }) => {

    return (
        <div className='wrapper' data-testid="movies">
            {movies.results?.map((movie) => {
                return (
                    <Movie 
                        movie={movie} 
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
            {movies.page < movies.total_pages && (
                <div>
                   <button
                       onClick={loadMore}
                       disabled={fetchStatus === 'loading'}
                    >
                    {fetchStatus === 'loading' ? 'Loading…' : 'Load More'}
                  </button>
                </div>
            )}
        </div>
    )
}

export default Movies
