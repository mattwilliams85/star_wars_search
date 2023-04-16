import { useSelector } from 'react-redux';

import MovieCard from './MovieCard';
import { MovieType } from '../../types/movie';
import { SearchType } from '../../types/search';
import LoadingSpinner from '../../components/LoadingSpinner';
import styles from './styles.module.css';

interface State {
  search: SearchType;
}

const MovieList = () => {
  const movies = useSelector((state: State) => state.search);

  if (movies.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.movieList}>
      <div className={styles.header}>{movies.query && `Star Wars movies with '${movies.query}'`}</div>
      <div className={styles.movieListContainer}>
        {!!movies.results.length ?
          movies.results.map((movie: MovieType, i: number) => <MovieCard movie={movie} key={i} />)
          : <div className={styles.empty}>No Results</div>
        }
      </div>
    </div>
  );
};

export default MovieList;
