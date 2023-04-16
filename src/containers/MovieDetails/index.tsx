import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { fetchMovieDetails } from '../../api/movies';
import { MovieType } from '../../types/movie';
import LoadingSpinner from '../../components/LoadingSpinner';
import Crawl from './Crawl';
import { ReactComponent as PlayIcon } from '../../assets/images/icon-play.svg';
import styles from './styles.module.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState<MovieType>();
  const [showCrawl, setShowCrawl] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { episodeId } = useParams();

  useEffect(() => {
    (async () => {
      const results = await fetchMovieDetails(episodeId);
      setMovie(results);
      setIsLoading(false);
    })();
  }, []);

  const handleOnClick = () => {
    setShowCrawl(!showCrawl);
  };

  if (isLoading || !movie) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.movieDetails}>
      {showCrawl ?
        (<Crawl movie={movie} onClose={handleOnClick} />) :
        (<>
          <h1>{movie.title}</h1>
          <div className={styles.card}>
            <div>
              <h3>Director</h3>
              <div className={styles.detail}>{movie.director}</div>
            </div>
            <div>
              <h3>Release Date</h3>
              <div className={styles.detail}>{movie.release_date.toString()}</div>
            </div>
            <div>
              <h3>Opening Crawl</h3>
              <div className={styles.detail}>{movie.opening_crawl}</div>
            </div>
            <button className={styles.button} onClick={handleOnClick}>
              <PlayIcon className={styles.icon} /> Play Opening Crawl
            </button>
          </div>
        </>)
      }
    </div>
  );
};

export default MovieDetails;
