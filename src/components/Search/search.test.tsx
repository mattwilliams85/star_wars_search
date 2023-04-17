// @ts-nocheck
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../app/store';
import Search from './index';
import { BrowserRouter } from "react-router-dom";

const fetchMovieListResponse = {
  count: 1,
  query: 'abc123',
  results: [
    {
      title: 'The Phantom Menace',
      episode_id: 1
    }
  ]
};

describe('<Search />', () => {
  let searchTextBox: HTMLElement;
  let data: { query: string; };

  const setup = () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </BrowserRouter>
    );

    searchTextBox = screen.getByRole('textbox', {
      name: /search/i,
    });
  };

  beforeEach(() => {
    data = {
      query: 'phantom'
    };
    jest.spyOn(window, 'fetch').mockResolvedValue({
      json: async () => (fetchMovieListResponse)
    });
  });

  test('should accept input', async () => {
    setup();
    const user = userEvent.setup();
    await user.clear(searchTextBox);
    await user.type(searchTextBox, data.query);
    expect(searchTextBox).toHaveValue(data.query);
  });

  test('should update search state successfully', async () => {
    setup();
    const user = userEvent.setup();
    await user.clear(searchTextBox);
    await user.type(searchTextBox, data.query);
    await user.keyboard('enter');
    const state = store.getState().search;

    expect(state.count).toEqual(1);
    expect(state.results[0].title).toEqual(fetchMovieListResponse.results[0].title);
  });

});