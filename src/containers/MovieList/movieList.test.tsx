// @ts-nocheck
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import MovieList from './index';
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore();
const searchData = {
  query: 'abc123',
  isLoading: false,
  results: [
    {
      title: 'The Phantom Menace',
      episode_id: 4,
      director: 'George Lucas',
      opening_crawl: 'In a galaxy far far away...',
      release_date: new Date('01-01-2022'),
    }
  ]
};

describe('<MovieList />', () => {
  const store = mockStore({ search: searchData });
  const setup = () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MovieList />
        </Provider>
      </BrowserRouter>
    );
  };

  test('should render movies successfully', async () => {
    setup();
    expect(screen.getByText("Star Wars movies with 'abc123'")).toBeVisible();
    expect(screen.getByText('The Phantom Menace')).toBeVisible();
    expect(screen.getByText('IV')).toBeVisible();
    expect(screen.getByTestId('director').textContent).toBe('Directed by George Lucas (2022)');
  });
});