import { render, screen, fireEvent } from '@testing-library/react';

import FilmContainer from './FilmContainer';

const film = {
  id: 135397,
  overview: 'Twenty-two years after the events of Jurassic Park...',
  release_date: '2015-06-12',
  poster_path: '/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg',
  title: 'Jurassic World',
  vote_average: 6.9,
};

describe('FilmContainer', () => {
  test('Initially renders summary view', () => {
    render(<FilmContainer {...film} setRatingFor={jest.fn} />);
    expect(screen.queryByText(film.title)).toBeDefined();
    expect(screen.queryByText(film.overview)).toBeNull();
  });

  // Given the FilmContainer is rendered
  // And FilmContainer's state.detail is false
  // When I click on the title
  // Then I expect the details (overview and poster) to be visible
  // When I click on the title
  // Then I expect the details (overview and poster) to not exist
  test('Clicking on title toggles detail view', () => {
    // Use mount so that children will be rendered and we can interact with
    // the DOM
    render(<FilmContainer {...film} setRatingFor={jest.fn} />);
    let title = screen.queryByText(film.title);
    expect(title).toBeDefined();
    expect(screen.queryByText(film.overview)).toBeNull();

    fireEvent.click(title);
    expect(screen.queryByText(film.overview)).toBeDefined();
    expect(screen.queryByAltText(film.title)).toBeDefined();

    title = screen.queryByText(film.title);
    fireEvent.click(title);
    expect(screen.queryByText(film.overview)).toBeNull();
    expect(screen.queryByAltText(film.title)).toBeNull();
  });
});
