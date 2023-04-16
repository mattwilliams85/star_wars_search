import { useEffect } from 'react';
import dompurify from 'dompurify';

import { MovieType } from '../../../types/movie';
import { romanize } from '../../../util';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import styles from './styles.module.css';
const theme = require('../../../assets/audio/sw_theme.mp3');

const AUDIO_TIMEOUT = 6500;
let audioTimeout: ReturnType<typeof setTimeout>;;

interface Props {
  movie: MovieType,
  onClose: React.MouseEventHandler;
}

const Crawl: React.FC<Props> = ({ movie, onClose }) => {
  // ASCII to HTML
  const parsedCrawl = movie.opening_crawl.replaceAll('\r\n\r\n', '<br/><br/>');
  const audio = new Audio(theme);

  useEffect(() => {
    audioTimeout = setTimeout(() => {
      audio.play();
    }, AUDIO_TIMEOUT);
    return () => {
      audio.pause();
      audio.currentTime = 0;
      clearTimeout(audioTimeout);
    };
  }, []);

  return (
    <div className={styles.container} onClick={onClose}>
      <div className={styles.intro}>
        A long time ago, in a galaxy far, far away...
      </div>
      <Logo className={styles.logo} />
      <div className={styles.fade}></div>
      <div className={styles.crawlWrap}>
        <div className={styles.crawl}>
          <div className={styles.title}>
            <p>Episode {romanize(movie.episode_id)}</p>
            <h1>{movie.title}</h1>
          </div>

          <div className={styles.text} dangerouslySetInnerHTML={{ __html: dompurify.sanitize(parsedCrawl) }} />
        </div>
      </div>
    </div>
  );
};

export default Crawl;