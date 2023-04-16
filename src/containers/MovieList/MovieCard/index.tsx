import React from 'react';
import { Link } from "react-router-dom";

import { romanize } from '../../../util';
import { MovieType } from '../../../types/movie';
import styles from './styles.module.css';

interface Props {
  movie: MovieType;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const formatDate = (date: Date) => {
    return new Date(date).getFullYear();
  };

  return (
    <Link className={styles.card} to={`/movies/${movie.episode_id}`}>
      <div className={styles.number}>
        <div>{romanize(movie.episode_id)}</div>
      </div>
      <div>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.subtext}>Directed by {movie.director} {`(${formatDate(movie.release_date)})`}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
