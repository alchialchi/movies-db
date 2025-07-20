import useInfiniteScroll from '../hooks/useInfiniteScroll'
import Movie from './Movie'
import '../styles/movies.scss'

const Movies = ({ movies, viewTrailer, fetchStatus, loadMore }) => {

    useInfiniteScroll({
        isLoading: fetchStatus === 'loading',
        hasMore: movies.page < movies.total_pages,
        onLoadMore: loadMore,
        threshold: 200
    })

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
            {fetchStatus === 'loading' && (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default Movies
