import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import classnames from 'classnames';

import { update, loadStatus } from './searchSlice';
import { fetchMovieList } from '../../api/movies';
import { ReactComponent as SearchIcon } from '../../assets/images/icon-search.svg';
import { ReactComponent as CloseIcon } from '../../assets/images/icon-back.svg';
import styles from './styles.module.css';

interface Props {
  isOpen?: boolean;
}

const Search: React.FC<Props> = () => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getMovies(true);
  }, []);

  const getMovies = async function (preventRedirect?: boolean) {
    if (!preventRedirect) navigate('/');
    dispatch(loadStatus(true));
    const result = await fetchMovieList(searchInput);
    dispatch(update(result));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getMovies();
    }
  };

  return (
    <div className={styles.searchWrap}>
      <input
        role="textbox"
        aria-label="search"
        placeholder='Search for Star Wars films'
        onChange={e => setSearchInput(e.target.value)}
        value={searchInput}
        onKeyDown={handleKeyDown}
        className={classnames(styles.search, {
          [styles.withInput]: searchInput
        })}
      />
      <SearchIcon className={classnames(styles.icon, styles.searchIcon)} onClick={() => { getMovies(); }} />
      {searchInput &&
        <CloseIcon className={classnames(styles.icon, styles.closeIcon)} onClick={() => setSearchInput('')} />
      }
    </div>
  );
};

export default Search;
