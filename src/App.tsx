import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Search from './components/ Search';
import MovieList from './containers/MovieList';
import MovieDetails from './containers/MovieDetails';
import styles from './styles.module.css';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Search />
        <Routes>
          <Route index path="/movies" element={<MovieList />} />
          <Route path="/movies/:episodeId" element={<MovieDetails />} />
          <Route
            path="*"
            element={<Navigate to="/movies" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
